package main

import (
	"fmt"
	"log"
	"os"
	"websitem/internal/database"
	"websitem/internal/handlers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// .env dosyasını yükle
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}

	// Veritabanı bağlantısını başlat
	db := database.InitDB()
	defer db.Close()

	// Gin router'ı oluştur
	r := gin.Default()

	// CORS ayarları
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://127.0.0.1:5500", "http://localhost:5500"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	// Handler'ları başlat
	h := handlers.NewHandler(db)

	// Ana route'lar
	r.GET("/", h.Home)
	r.POST("/contact", h.Contact)

	// API route'ları
	api := r.Group("/api")
	{
		api.GET("/teams", h.GetTeams)
		api.GET("/teams/:id", h.GetTeamDetails)
		api.GET("/teams/:id/past-leaders", h.GetPastLeaders)
	}

	// Server'ı başlat
	serverAddr := fmt.Sprintf("%s:%s", os.Getenv("SERVER_HOST"), os.Getenv("SERVER_PORT"))
	r.Run(serverAddr)
}
