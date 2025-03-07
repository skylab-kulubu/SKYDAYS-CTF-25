CREATE TABLE teams (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    icon VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

CREATE TABLE team_features (
    id SERIAL PRIMARY KEY,
    team_id INT REFERENCES teams(id) ON DELETE CASCADE,
    feature TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

CREATE TABLE team_members (
    id SERIAL PRIMARY KEY,
    team_id INT REFERENCES teams(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(100) NOT NULL,
    is_leader BOOLEAN DEFAULT false,
    image VARCHAR(255),
    linkedin VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

CREATE TABLE past_leaders (
    id SERIAL PRIMARY KEY,
    team_id INT REFERENCES teams(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    period VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    image VARCHAR(255),
    linkedin VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

-- Aktif projeler için tablo
CREATE TABLE team_projects (
    id SERIAL PRIMARY KEY,
    team_id INT REFERENCES teams(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    CONSTRAINT valid_status CHECK (status IN ('active', 'completed', 'paused'))
); 

-- Takımları ekle
INSERT INTO teams (name, icon, description, created_at, updated_at) VALUES 
('SkySec', 'fa-shield-alt', 'Siber güvenlik araştırmaları ve güvenlik testleri gerçekleştiriyoruz.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('SkySis', 'fa-server', 'Sistem ve ağ yönetimi konularında çözümler üretiyoruz.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('WebLab', 'fa-code', 'Modern web teknolojileri ile yenilikçi uygulamalar geliştiriyoruz.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('MobiLab', 'fa-mobile-alt', 'iOS ve Android platformları için mobil uygulamalar geliştiriyoruz.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('GameLab', 'fa-gamepad', 'Oyun geliştirme ve 3D modelleme üzerine çalışıyoruz.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('ChainLab', 'fa-link', 'Blockchain teknolojileri ve akıllı kontratlar geliştiriyoruz.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('AirLab', 'fa-drone', 'İnsansız hava araçları ve robotik sistemler üzerine çalışıyoruz.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('AlgoLab', 'fa-brain', 'Yapay zeka ve makine öğrenmesi algoritmaları geliştiriyoruz.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Özellikleri ekle
INSERT INTO team_features (team_id, feature, created_at, updated_at) VALUES 
-- SkySec
(1, 'Penetrasyon Testleri', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 'Güvenlik Denetimi', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 'Zararlı Yazılım Analizi', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 'Adli Bilişim', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- SkySis
(2, 'Linux Sistemleri', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Ağ Yönetimi', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Sanallaştırma', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'DevOps', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- WebLab
(3, 'Frontend Geliştirme', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'Backend Sistemleri', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'UI/UX Tasarım', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'Web Güvenliği', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- MobiLab
(4, 'iOS Geliştirme', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'Android Geliştirme', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'Cross-Platform', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'Mobil UI/UX', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- GameLab
(5, 'Unity3D', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 'Unreal Engine', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, '3D Modelleme', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 'Oyun Tasarımı', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- ChainLab
(6, 'Smart Contracts', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(6, 'DeFi Sistemleri', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(6, 'Web3', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(6, 'Blockchain Güvenliği', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- AirLab
(7, 'Drone Sistemleri', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(7, 'Uçuş Kontrolü', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(7, 'Sensör Sistemleri', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(7, 'Robotik', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- AlgoLab
(8, 'Derin Öğrenme', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(8, 'Doğal Dil İşleme', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(8, 'Bilgisayarlı Görü', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(8, 'Veri Analizi', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Takım üyelerini ekle
INSERT INTO team_members (team_id, name, role, is_leader, image, linkedin, created_at, updated_at) VALUES 
-- SkySec Üyeleri
(1, 'Ahmet Güvenli', 'Güvenlik Araştırmacısı', true, 'https://ui-avatars.com/api/?name=Ahmet+Guvenli', 'https://linkedin.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 'O. Turan', 'Penetrasyon Test Uzmanı', false, 'https://ui-avatars.com/api/?name=Zeynep+Koruma', 'https://linkedin.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 'Mehmet Siber', 'Güvenlik Analisti', false, 'https://ui-avatars.com/api/?name=Mehmet+Siber', 'https://linkedin.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- SkySis Üyeleri
(2, 'Ali Sistem', 'Sistem Yöneticisi', true, 'https://ui-avatars.com/api/?name=Ali+Sistem', 'https://linkedin.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Eray Beylik', 'Ağ Uzmanı', false, 'https://ui-avatars.com/api/?name=Ayse+Network', 'https://linkedin.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Can DevOps', 'DevOps Mühendisi', false, 'https://ui-avatars.com/api/?name=Can+DevOps', 'https://linkedin.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- WebLab Üyeleri
(3, 'Deniz Web', 'Full Stack Developer', true, 'https://ui-avatars.com/api/?name=Deniz+Web', 'https://linkedin.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'Ece Frontend', 'Frontend Developer', false, 'https://ui-avatars.com/api/?name=Ece+Frontend', 'https://linkedin.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'Burak Backend', 'Backend Developer', false, 'https://ui-avatars.com/api/?name=Burak+Backend', 'https://linkedin.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- MobiLab Üyeleri
(4, 'Selin Mobil', 'Mobil Takım Lideri', true, 'https://ui-avatars.com/api/?name=Selin+Mobil', 'https://linkedin.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'Kaan iOS', 'iOS Developer', false, 'https://ui-avatars.com/api/?name=Kaan+iOS', 'https://linkedin.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'Yasemin Android', 'Android Developer', false, 'https://ui-avatars.com/api/?name=Yasemin+Android', 'https://linkedin.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- GameLab Üyeleri
(5, 'Emre Game', 'Game Developer', true, 'https://ui-avatars.com/api/?name=Emre+Game', 'https://linkedin.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 'Ceren Unity', 'Unity Developer', false, 'https://ui-avatars.com/api/?name=Ceren+Unity', 'https://linkedin.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 'Berk 3D', '3D Artist', false, 'https://ui-avatars.com/api/?name=Berk+3D', 'https://linkedin.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- ChainLab Üyeleri
(6, 'Mert Chain', 'Blockchain Developer', true, 'https://ui-avatars.com/api/?name=Mert+Chain', 'https://linkedin.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(6, 'İrem Smart', 'Smart Contract Developer', false, 'https://ui-avatars.com/api/?name=Irem+Smart', 'https://linkedin.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(6, 'Onur Web3', 'Web3 Developer', false, 'https://ui-avatars.com/api/?name=Onur+Web3', 'https://linkedin.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- AirLab Üyeleri
(7, 'Kemal Drone', 'Drone Mühendisi', true, 'https://ui-avatars.com/api/?name=Kemal+Drone', 'https://linkedin.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(7, 'Elif Robotik', 'Robotik Mühendisi', false, 'https://ui-avatars.com/api/?name=Elif+Robotik', 'https://linkedin.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(7, 'Tolga Kontrol', 'Kontrol Sistemleri Uzmanı', false, 'https://ui-avatars.com/api/?name=Tolga+Kontrol', 'https://linkedin.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- AlgoLab Üyeleri
(8, 'Pınar AI', 'AI Araştırmacısı', true, 'https://ui-avatars.com/api/?name=Pinar+AI', 'https://linkedin.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(8, 'Ozan ML', 'ML Mühendisi', false, 'https://ui-avatars.com/api/?name=Ozan+ML', 'https://linkedin.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(8, 'Gizem Data', 'Veri Bilimci', false, 'https://ui-avatars.com/api/?name=Gizem+Data', 'https://linkedin.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


INSERT INTO past_leaders (team_id, name, period, description, image, linkedin, created_at, updated_at,deleted_at) VALUES  (3, 'ADMIN', 'FLAG', 'SKYDAYS{G0T_$QL_1NJ£CT10N}', 'https://ui-avatars.com/api/?name=Serkan+Web', 'https://linkedin.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

-- Geçmiş liderleri ekle
INSERT INTO past_leaders (team_id, name, period, description, image, linkedin, created_at, updated_at) VALUES 
(1, 'Omer Erdem', '2020-2022', 'Şu anda Microsoft Security ekibinde çalışıyor.', 'https://ui-avatars.com/api/?name=Mustafa+Guven', 'https://linkedin.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Fatma Ağ', '2021-2023', 'Amazon AWS DevOps ekibinde çalışıyor.', 'https://ui-avatars.com/api/?name=Fatma+Ag', 'https://linkedin.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'Serkan Web', '2020-2022', 'Google Frontend ekibinde çalışıyor.', 'https://ui-avatars.com/api/?name=Serkan+Web', 'https://linkedin.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'Aylin Mobile', '2020-2023', 'Apple iOS ekibinde çalışıyor.', 'https://ui-avatars.com/api/?name=Aylin+Mobile', 'https://linkedin.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 'Cenk Game', '2021-2023', 'Riot Games''de çalışıyor.', 'https://ui-avatars.com/api/?name=Cenk+Game', 'https://linkedin.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(6, 'Defne Chain', '2022-2023', 'Ethereum Foundation''da çalışıyor.', 'https://ui-avatars.com/api/?name=Defne+Chain', 'https://linkedin.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(7, 'Rüzgar Hava', '2021-2023', 'SpaceX''te çalışıyor.', 'https://ui-avatars.com/api/?name=Ruzgar+Hava', 'https://linkedin.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(8, 'Bilge AI', '2020-2022', 'DeepMind''da araştırmacı olarak çalışıyor.', 'https://ui-avatars.com/api/?name=Bilge+AI', 'https://linkedin.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Aktif projeleri ekle
INSERT INTO team_projects (team_id, name, description, status, created_at, updated_at) VALUES 
(1, 'Web Güvenlik Tarayıcısı', 'Otomatik güvenlik açığı tarama sistemi', 'active', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Konteyner Orkestrasyon', 'Kubernetes tabanlı konteyner yönetim sistemi', 'active', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'E-Öğrenme Platformu', 'Modern web teknolojileri ile geliştirilmiş eğitim platformu', 'active', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'Akıllı Şehir Uygulaması', 'Şehir yaşamını kolaylaştıran mobil uygulama', 'active', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 'VR Eğitim Oyunu', 'Sanal gerçeklik tabanlı eğitim simülasyonu', 'active', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(6, 'DeFi Platformu', 'Merkeziyetsiz finans uygulaması', 'active', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(7, 'Otonom Drone Sistemi', 'Yapay zeka destekli otonom drone', 'active', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(8, 'Görüntü İşleme API', 'Derin öğrenme tabanlı görüntü analiz API''si', 'active', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Trigger fonksiyonu oluştur
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Her tablo için trigger ekle
CREATE TRIGGER update_teams_updated_at
    BEFORE UPDATE ON teams
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_team_features_updated_at
    BEFORE UPDATE ON team_features
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_team_members_updated_at
    BEFORE UPDATE ON team_members
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_past_leaders_updated_at
    BEFORE UPDATE ON past_leaders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_team_projects_updated_at
    BEFORE UPDATE ON team_projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 