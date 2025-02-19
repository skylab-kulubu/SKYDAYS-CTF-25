### JwtCtf Frontend

<div style="display: flex; justify-content: center; align-items: center; gap: 10px; text-align: center;">
  <img src="https://github.com/user-attachments/assets/3840c01c-c591-4d91-bf11-d84c815d0e8d" alt="SkyLabLogo" width="200">
  <img src="https://github.com/user-attachments/assets/eb3c0dce-2ff7-417e-9497-461a512d64a7" alt="SkySecLogo" width="200">  
</div>

## Proje Kurulumu

### Gereksinimler
- Node.js
- Angular CLI

### Kurulum

1. **Node.js kur ve doğrula:**
   ```sh
   - https://nodejs.org/en/download
   - node -v
   ```

2. **Angular CLI kur ve doğrula:**
   ```sh
   - sudo su
   - npm install -g @angular/cli
   - ng version
   ```
   
3. **Console'da proje dosyasını aç:**
   ```sh
   - .../jwt-ctf-frontend
   ```
   
4. **Gereksinimleri yükle:**
   ```sh
   - npm install
   ```

5. **Projeyi çalıştır**
   ```sh
   - ng serve --open
   ```

6. **Projeyi görüntüle**
   ```sh
   - http://localhost:4200
   ```

### Notlar
- Projeyi çalıştır aşamasında rxjs bulunamadı hatası alınırsa 'npm i rxjs@7.5.2' çalıştırılıp bu aşamadan devam edilmeli.
