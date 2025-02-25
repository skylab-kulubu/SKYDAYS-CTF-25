# Base image olarak Nginx kullan
FROM nginx:latest

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Frontend dosyalarını kopyala
COPY ./public/ /var/www/html/


# Nginx portunu aç
EXPOSE 80

# Nginx servisini başlat
CMD ["nginx", "-g", "daemon off;"]