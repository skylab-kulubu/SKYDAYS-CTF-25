FROM golang:1.22-alpine AS builder 
WORKDIR /app
COPY . .
RUN go build -o main cmd/main.go 
RUN apk add curl 
RUN curl -L https://github.com/golang-migrate/migrate/releases/download/v4.15.2/migrate.linux-amd64.tar.gz | tar xvz 
RUN mv migrate.linux-amd64 migrate

FROM alpine:3.20
WORKDIR /app
COPY --from=builder /app/main . 
COPY --from=builder /app/migrate ./migrate
COPY .env . 
COPY start.sh .
COPY wait-for.sh .
COPY internal/database/migrations ./migration

RUN chmod +x start.sh wait-for.sh migrate

EXPOSE 8080 
ENTRYPOINT ["/app/start.sh"]
CMD ["/app/main"]