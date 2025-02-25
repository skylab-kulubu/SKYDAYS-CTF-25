-- Önce triggerleri kaldır
DROP TRIGGER IF EXISTS update_teams_updated_at ON teams;
DROP TRIGGER IF EXISTS update_team_features_updated_at ON team_features;
DROP TRIGGER IF EXISTS update_team_members_updated_at ON team_members;
DROP TRIGGER IF EXISTS update_past_leaders_updated_at ON past_leaders;
DROP TRIGGER IF EXISTS update_team_projects_updated_at ON team_projects;

-- Trigger fonksiyonunu kaldır
DROP FUNCTION IF EXISTS update_updated_at_column();

-- Tabloları kaldır
DROP TABLE IF EXISTS team_projects;
DROP TABLE IF EXISTS past_leaders;
DROP TABLE IF EXISTS team_members;
DROP TABLE IF EXISTS team_features;
DROP TABLE IF EXISTS teams; 