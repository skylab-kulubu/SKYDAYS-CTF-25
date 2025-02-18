```bash
# Clone CTFd 
git clone https://github.com/CTFd/CTFd.git ~/.ctfd
cd ~/.ctfd
# Install Neon Theme 
git clone https://github.com/chainflag/ctfd-neon-theme.git ~/.ctfd/CTFd/themes/neon

# Start CTFd On Port 80
docker compose up -d --force-recreate --build
```


# Port Binding

`CTFd` erişiminin yalnızca VPN ağı üzerinden olması için aşağıdaki değişiklikleri yapmanız gerekmekte

```diff
--- a/docker-compose.yml
+++ b/docker-compose.yml
@@ -4,7 +4,7 @@ services:
     user: root
     restart: always
     ports:
-      - "8000:8000"
+      - "127.0.0.1:8000:8000"
     environment:
       - UPLOAD_FOLDER=/var/uploads
       - DATABASE_URL=mysql+pymysql://ctfd:ctfd@db/ctfd
@@ -30,7 +30,7 @@ services:
     volumes:
       - ./conf/nginx/http.conf:/etc/nginx/nginx.conf
     ports:
-      - 80:80
+      - 10.0.0.1:80:80
     depends_on:
       - ctfd
```
