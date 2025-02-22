package models

import (
	"time"
)

type Team struct {
	ID          int        `json:"id"`
	Name        string     `json:"name"`
	Icon        string     `json:"icon"`
	Description string     `json:"description"`
	Features    []string   `json:"features"`
	CreatedAt   time.Time  `json:"created_at"`
	UpdatedAt   time.Time  `json:"updated_at"`
	DeletedAt   *time.Time `json:"deleted_at,omitempty"`
}

type TeamMember struct {
	ID        int        `json:"id"`
	TeamID    int        `json:"team_id"`
	Name      string     `json:"name"`
	Role      string     `json:"role"`
	IsLeader  bool       `json:"is_leader"`
	Image     string     `json:"image"`
	LinkedIn  string     `json:"linkedin"`
	CreatedAt time.Time  `json:"created_at"`
	UpdatedAt time.Time  `json:"updated_at"`
	DeletedAt *time.Time `json:"deleted_at,omitempty"`
}

type PastLeader struct {
	ID          int        `json:"id"`
	TeamID      int        `json:"team_id"`
	Name        string     `json:"name"`
	Period      string     `json:"period"`
	Description string     `json:"description"`
	Image       string     `json:"image"`
	LinkedIn    string     `json:"linkedin"`
	CreatedAt   time.Time  `json:"created_at"`
	UpdatedAt   time.Time  `json:"updated_at"`
	DeletedAt   *time.Time `json:"deleted_at,omitempty"`
}

type TeamProject struct {
	ID          int        `json:"id"`
	TeamID      int        `json:"team_id"`
	Name        string     `json:"name"`
	Description string     `json:"description"`
	Status      string     `json:"status"`
	CreatedAt   time.Time  `json:"created_at"`
	UpdatedAt   time.Time  `json:"updated_at"`
	DeletedAt   *time.Time `json:"deleted_at,omitempty"`
}
