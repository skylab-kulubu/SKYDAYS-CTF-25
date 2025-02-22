package handlers

import (
	"database/sql"
	"fmt"
	"net/http"
	"strconv"
	"websitem/internal/models"

	"github.com/gin-gonic/gin"
)

type Handler struct {
	db *sql.DB
}

func NewHandler(db *sql.DB) *Handler {
	return &Handler{db: db}
}

// Ana sayfa handler'ı
func (h *Handler) Home(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "Hoş geldiniz!",
	})
}

// İletişim formu handler'ı
func (h *Handler) Contact(c *gin.Context) {
	var message models.Message
	if err := c.ShouldBindJSON(&message); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":  "success",
		"message": "Mesajınız alındı",
	})
}

// Tüm takımları getir
func (h *Handler) GetTeams(c *gin.Context) {
	var teams []models.Team
	query := `
		SELECT id, name, icon, description 
		FROM teams 
		WHERE deleted_at IS NULL
		ORDER BY name`

	rows, err := h.db.Query(query)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Takımlar alınamadı"})
		return
	}
	defer rows.Close()

	for rows.Next() {
		var team models.Team
		err := rows.Scan(&team.ID, &team.Name, &team.Icon, &team.Description)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Veri okuma hatası"})
			return
		}
		teams = append(teams, team)
	}

	c.JSON(http.StatusOK, teams)
}

// Takım detaylarını getir
func (h *Handler) GetTeamDetails(c *gin.Context) {
	teamID := c.Param("id")
	if teamID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Takım ID'si gerekli"})
		return
	}

	teamIDInt, err := strconv.Atoi(teamID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Geçersiz takım ID'si"})
		return
	}

	// Takım bilgilerini getir
	var team models.Team
	teamQuery := `
		SELECT id, name, icon, description 
		FROM teams 
		WHERE id = $1 AND deleted_at IS NULL`

	err = h.db.QueryRow(teamQuery, teamIDInt).Scan(&team.ID, &team.Name, &team.Icon, &team.Description)
	if err != nil {
		if err == sql.ErrNoRows {
			c.JSON(http.StatusNotFound, gin.H{"error": "Takım bulunamadı"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Takım bilgileri alınamadı"})
		return
	}

	// Takım özelliklerini getir
	featuresQuery := `
		SELECT feature 
		FROM team_features 
		WHERE team_id = $1 AND deleted_at IS NULL`

	featureRows, err := h.db.Query(featuresQuery, teamIDInt)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Özellikler alınamadı"})
		return
	}
	defer featureRows.Close()

	var features []string
	for featureRows.Next() {
		var feature string
		if err := featureRows.Scan(&feature); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Özellik okunamadı"})
			return
		}
		features = append(features, feature)
	}
	team.Features = features

	// Takım üyelerini getir
	membersQuery := `
		SELECT id, name, role, is_leader, image, linkedin 
		FROM team_members 
		WHERE team_id = $1 AND deleted_at IS NULL
		ORDER BY 
			CASE WHEN is_leader = true THEN 0 ELSE 1 END,
			name ASC`

	memberRows, err := h.db.Query(membersQuery, teamIDInt)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Üye bilgileri alınamadı"})
		return
	}
	defer memberRows.Close()

	var members []models.TeamMember
	for memberRows.Next() {
		var member models.TeamMember
		err := memberRows.Scan(
			&member.ID,
			&member.Name,
			&member.Role,
			&member.IsLeader,
			&member.Image,
			&member.LinkedIn,
		)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Üye bilgileri okunamadı"})
			return
		}
		member.TeamID = teamIDInt
		members = append(members, member)
	}

	// Takım istatistiklerini getir
	var stats struct {
		TotalMembers   int `json:"total_members"`
		ActiveProjects int `json:"active_projects"`
		PastLeaders    int `json:"past_leaders_count"`
	}

	// Üye sayısı
	stats.TotalMembers = len(members)

	// Geçmiş lider sayısı
	err = h.db.QueryRow(`
		SELECT COUNT(*) 
		FROM past_leaders 
		WHERE team_id = $1 AND deleted_at IS NULL`, teamIDInt).Scan(&stats.PastLeaders)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "İstatistikler alınamadı"})
		return
	}

	// Aktif proje sayısı
	err = h.db.QueryRow(`
		SELECT COUNT(*) 
		FROM team_projects 
		WHERE team_id = $1 AND status = 'active' AND deleted_at IS NULL`, teamIDInt).Scan(&stats.ActiveProjects)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Proje sayısı alınamadı"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"team":     team,
		"members":  members,
		"stats":    stats,
		"features": features,
	})
}

// Geçmiş liderleri getir
func (h *Handler) GetPastLeaders(c *gin.Context) {
	teamID := c.Param("id")
	if teamID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Takım ID'si gerekli"})
		return
	}

	// Takım adını getir
	var teamName string
	teamQuery := fmt.Sprintf("SELECT name FROM teams WHERE id = %s AND deleted_at IS NULL", teamID)
	err := h.db.QueryRow(teamQuery).Scan(&teamName)
	if err != nil {
		if err == sql.ErrNoRows {
			c.JSON(http.StatusNotFound, gin.H{"error": "Takım bulunamadı"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Takım bilgisi alınamadı"})
		return
	}

	// Geçmiş liderleri getir - SQL Injection'a açık sorgu
	query := fmt.Sprintf(`
		SELECT id, name, period, description, image, linkedin 
		FROM past_leaders 
		WHERE team_id = %s AND deleted_at IS NULL
		ORDER BY period DESC`, teamID)

	rows, err := h.db.Query(query)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Geçmiş liderler alınamadı"})
		return
	}
	defer rows.Close()

	var pastLeaders []models.PastLeader
	for rows.Next() {
		var leader models.PastLeader
		err := rows.Scan(
			&leader.ID,
			&leader.Name,
			&leader.Period,
			&leader.Description,
			&leader.Image,
			&leader.LinkedIn,
		)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Lider bilgileri okunamadı"})
			return
		}
		pastLeaders = append(pastLeaders, leader)
	}

	c.JSON(http.StatusOK, gin.H{
		"team_name":    teamName,
		"past_leaders": pastLeaders,
	})
}
