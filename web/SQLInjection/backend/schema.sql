CREATE TABLE teams (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    icon VARCHAR(50) NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE team_features (
    id SERIAL PRIMARY KEY,
    team_id INT REFERENCES teams(id),
    feature TEXT NOT NULL
);

CREATE TABLE team_members (
    id SERIAL PRIMARY KEY,
    team_id INT REFERENCES teams(id),
    name VARCHAR(100) NOT NULL,
    role VARCHAR(100) NOT NULL,
    is_leader BOOLEAN DEFAULT false,
    image VARCHAR(255),
    linkedin VARCHAR(255)
);

CREATE TABLE past_leaders (
    id SERIAL PRIMARY KEY,
    team_id INT REFERENCES teams(id),
    name VARCHAR(100) NOT NULL,
    period VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    image VARCHAR(255),
    linkedin VARCHAR(255)
);

-- Örnek veriler
INSERT INTO teams (name, icon, description) VALUES 
('Yapay Zeka Takımı', 'fa-brain', 'Makine öğrenimi ve derin öğrenme alanlarında projeler geliştiriyoruz.'),
('Web Geliştirme Takımı', 'fa-code', 'Modern web teknolojileri ile yenilikçi uygulamalar geliştiriyoruz.'),
('Siber Güvenlik Takımı', 'fa-shield-alt', 'Güvenlik açıklarını tespit ediyor ve çözümler üretiyoruz.'),
('Mobil Uygulama Takımı', 'fa-mobile-alt', 'iOS ve Android platformları için uygulamalar geliştiriyoruz.'); 