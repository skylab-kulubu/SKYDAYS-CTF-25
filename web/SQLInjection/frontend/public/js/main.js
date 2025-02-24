document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');
    
    // Takımları API'den al
    async function fetchTeams() {
        try {
            const response = await fetch('http://api.skyinjection.ctf/api/teams');
            if (!response.ok) {
                throw new Error('Takımlar yüklenirken hata oluştu');
            }
            const teams = await response.json();
            return teams;
        } catch (error) {
            console.error('Takımlar yüklenirken hata:', error);
            return [];
        }
    }

    // Takım detaylarını API'den al
    async function fetchTeamDetails(teamId) {
        try {
            const response = await fetch(`http://api.skyinjection.ctf/api/teams/${teamId}`);
            if (!response.ok) {
                throw new Error('Takım detayları yüklenirken hata oluştu');
            }
            const details = await response.json();
            return details;
        } catch (error) {
            console.error('Takım detayları yüklenirken hata:', error);
            return null;
        }
    }

    // Geçmiş liderleri API'den al
    async function fetchPastLeaders(teamId) {
        try {
            const response = await fetch(`http://api.skyinjection.ctf/api/teams/${teamId}/past-leaders`);
            if (!response.ok) {
                throw new Error('Geçmiş liderler yüklenirken hata oluştu');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Geçmiş liderler yüklenirken hata:', error);
            return null;
        }
    }

    // Modal içeriğini oluştur
    async function createModal(teamId) {
        const details = await fetchTeamDetails(teamId);
        if (!details) return;

        const { team, members, stats, features } = details;
        const currentLeader = members.find(member => member.is_leader);
        const teamMembers = members.filter(member => !member.is_leader);

        const modalHTML = `
            <div class="modal-overlay" id="teamModal">
                <div class="modal">
                    <button class="modal-close">&times;</button>
                    <div class="modal-content">
                        <div class="modal-header">
                            <h2>${team.name}</h2>
                        </div>

                        <div class="team-stats">
                            <div class="stat-item">
                                <i class="fas fa-users"></i>
                                <span>${stats.total_members} Üye</span>
                            </div>
                            <div class="stat-item">
                                <i class="fas fa-project-diagram"></i>
                                <span>${stats.active_projects} Aktif Proje</span>
                            </div>
                            <div class="stat-item">
                                <i class="fas fa-history"></i>
                                <span>${stats.past_leaders_count} Geçmiş Lider</span>
                            </div>
                        </div>

                        <div class="team-features">
                            <h3>Uzmanlık Alanları</h3>
                            <div class="features-list">
                                ${features.map(feature => `
                                    <span class="feature-tag">${feature}</span>
                                `).join('')}
                            </div>
                        </div>

                        ${currentLeader ? `
                            <div class="team-leader-section">
                                <div class="leader-section-header">
                                    <h3>Takım Lideri</h3>
                                    <button class="past-leaders-btn" title="Geçmiş Liderler">
                                        <i class="fas fa-history"></i>
                                    </button>
                                </div>
                                <div class="leader-card">
                                    <img src="${currentLeader.image}" alt="${currentLeader.name}" class="leader-image">
                                    <div class="leader-info">
                                        <h4>${currentLeader.name}</h4>
                                        <p class="leader-role">${currentLeader.role}</p>
                                    </div>
                                    <a href="${currentLeader.linkedin}" target="_blank" class="leader-linkedin">
                                        <i class="fab fa-linkedin"></i>
                                    </a>
                                </div>
                            </div>
                        ` : ''}

                        <div class="team-members">
                            <h3>Takım Üyeleri</h3>
                            ${teamMembers.map(member => `
                                <div class="member-card">
                                    <img src="${member.image}" alt="${member.name}" class="member-image">
                                    <div class="member-info">
                                        <h4>${member.name}</h4>
                                        <p class="member-role">${member.role}</p>
                                    </div>
                                    <a href="${member.linkedin}" target="_blank" class="member-linkedin">
                                        <i class="fab fa-linkedin"></i>
                                    </a>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        const modal = document.getElementById('teamModal');
        const modalOverlay = modal;  // overlay aynı zamanda modal'ın kendisi
        const closeBtn = modal.querySelector('.modal-close');
        const pastLeadersBtn = modal.querySelector('.past-leaders-btn');
        const modalContent = modal.querySelector('.modal-content');
        
        setTimeout(() => modal.classList.add('active'), 10);
        
        // Çarpıya tıklayınca kapat
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        });

        // Modal dışına tıklayınca kapat
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modal.classList.remove('active');
                setTimeout(() => modal.remove(), 300);
            }
        });

        // Geçmiş liderler butonu için event listener
        if (pastLeadersBtn) {
            pastLeadersBtn.addEventListener('click', async () => {
                const pastLeadersData = await fetchPastLeaders(teamId);
                if (pastLeadersData) {
                    showPastLeaders(pastLeadersData.past_leaders, pastLeadersData.team_name);
                }
            });
        }
    }

    // Geçmiş liderleri göster
    function showPastLeaders(pastLeaders, teamName) {
        const modalHTML = `
            <div class="modal-overlay past-leaders-modal" id="pastLeadersModal">
                <div class="modal">
                    <button class="modal-close">&times;</button>
                    <div class="modal-content">
                        <div class="modal-header">
                            <h2 class="modal-title">${teamName} - Geçmiş Takım Liderleri</h2>
                        </div>
                        <div class="past-leaders-grid">
                            ${pastLeaders.map(leader => `
                                <div class="past-leader-card">
                                    <img src="${leader.image}" alt="${leader.name}" class="past-leader-image">
                                    <h4>${leader.name}</h4>
                                    <p class="past-leader-role">${leader.period}</p>
                                    <p class="past-leader-description">${leader.description}</p>
                                    <a href="${leader.linkedin}" target="_blank" class="past-leader-linkedin">
                                        <i class="fab fa-linkedin"></i>
                                    </a>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        const modal = document.getElementById('pastLeadersModal');
        const modalOverlay = modal;
        const closeBtn = modal.querySelector('.modal-close');
        
        setTimeout(() => modal.classList.add('active'), 10);
        
        // Çarpıya tıklayınca kapat
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        });

        // Modal dışına tıklayınca kapat
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modal.classList.remove('active');
                setTimeout(() => modal.remove(), 300);
            }
        });
    }

    // Sayfa içeriğini güncelle
    async function updateContent(hash) {
        const teams = await fetchTeams();
        
        switch(hash) {
            case '#anasayfa':
                content.innerHTML = `
                    <section class="hero-section">
                        <div class="hero-content">
                            <h1 class="hero-title">Sky Lab: <span>Bilgisayar Bilimleri Kulübü</span></h1>
                        </div>
                    </section>

                    <section class="teams-section">
                        <h2 class="section-title">Takımlarımız</h2>
                        <div class="teams-grid">
                            ${teams.map(team => `
                                <div class="team-card" data-team="${team.id}">
                                    <i class="fas ${team.icon} team-icon"></i>
                                    <h3>${team.name}</h3>
                                    <p>${team.description}</p>
                                </div>
                            `).join('')}
                        </div>
                    </section>
                `;
                break;

            case '#takimlar':
                content.innerHTML = `
                    <section class="page-section teams-section">
                        <div class="section-container">
                            <h1 class="section-title">Takımlarımız</h1>
                            <div class="teams-grid">
                                ${teams.map(team => `
                                    <div class="team-card" data-team="${team.id}">
                                        <i class="fas ${team.icon} team-icon"></i>
                                        <h3>${team.name}</h3>
                                        <p>${team.description}</p>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </section>
                `;
                break;

            // ... diğer case'ler ...
        }

        // Takım kartlarına tıklama olaylarını ekle
        const teamCards = document.querySelectorAll('.team-card');
        teamCards.forEach(card => {
            card.addEventListener('click', () => {
                const teamId = card.getAttribute('data-team');
                createModal(teamId);
            });
        });
    }

    // Özel imleç için event listener
    document.addEventListener('mousemove', (e) => {
        const cursor = document.querySelector('.cursor');
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Sayfa yüklendiğinde ve hash değiştiğinde router'ı çalıştır
    window.addEventListener('hashchange', () => updateContent(window.location.hash));
    updateContent(window.location.hash || '#anasayfa');
});