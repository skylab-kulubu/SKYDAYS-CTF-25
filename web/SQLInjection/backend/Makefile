.PHONY: run build clean test migrate

# Değişkenler
BINARY_NAME=websitem
BUILD_DIR=build

# Go komutları
GO=go
GOBUILD=$(GO) build
GOCLEAN=$(GO) clean
GOTEST=$(GO) test
GOGET=$(GO) get

# Ana komutlar
all: clean build

build:
	@echo "Building..."
	@mkdir -p $(BUILD_DIR)
	@$(GOBUILD) -o $(BUILD_DIR)/$(BINARY_NAME) ./cmd/main.go

run:
	@echo "Running..."
	@$(GO) run ./cmd/main.go

clean:
	@echo "Cleaning..."
	@$(GOCLEAN)
	@rm -rf $(BUILD_DIR)

test:
	@echo "Testing..."
	@$(GOTEST) ./...

# Bağımlılıkları yükle
deps:
	@echo "Installing dependencies..."
	@$(GOGET) github.com/gorilla/mux
	@$(GOGET) github.com/lib/pq
	@$(GOGET) github.com/rs/cors

# Veritabanı komutları

createdb: 
	docker exec -it postgres createdb --username=root --owner=root sql_injection

dropdb:
	docker exec -it postgres dropdb sql_injection

migrateup: 
	migrate -path internal/database/migrations -database "postgresql://root:secret@localhost:5432/sql_injection?sslmode=disable" -verbose up

migratedown:
	migrate -path internal/database/migrations -database "postgresql://root:secret@localhost:5432/sql_injection?sslmode=disable" -verbose down

reset: dropdb createdb migrateup
