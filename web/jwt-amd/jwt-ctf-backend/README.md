### JwtCtf Backend

<div style="display: flex; justify-content: center; align-items: center; gap: 10px; text-align: center;">
  <img src="https://github.com/user-attachments/assets/3840c01c-c591-4d91-bf11-d84c815d0e8d" alt="SkyLabLogo" width="200">
  <img src="https://github.com/user-attachments/assets/eb3c0dce-2ff7-417e-9497-461a512d64a7" alt="SkySecLogo" width="200">  
</div>

## Proje Kurulumu

### Gereksinimler
- .Net 8.0 SDK

### Kurulum

1. **.Net 8.0 SDK kur ve doğrula**
   ```sh
   - sudo dnf install dotnet-sdk-8.0 -y
   - dotnet --version
   - node -v
   ```

2. **Console'da projeni aç:**
   ```sh
   - .../jwt-ctf-backend
   ```
   
3. **Projeyi yayınla:**
   ```sh
   - sudo su
   - dotnet publish -c Release -o /var/www/jwtctfapi
   ```

4. **Dosyaları taşı:**
   ```sh
   - ncp -r Resources /var/www/jwtctfapi/
   ```

5. **Console'da .dll dosyasını içeren klasör aç:**
   ```sh
   - cd var/www/jwtctfapi
   ```

6. **Frontend'de kullanılan porta göre alıştır:**
   ```sh
   - dotnet jwt-ctf-backend.dll --urls https://0.0.0.0:7106
   ```

