### JwtCtf

<div style="display: flex; justify-content: center; align-items: center; gap: 10px; text-align: center;">
  <img src="https://github.com/user-attachments/assets/3840c01c-c591-4d91-bf11-d84c815d0e8d" alt="SkyLabLogo" width="200">
  <img src="https://github.com/user-attachments/assets/eb3c0dce-2ff7-417e-9497-461a512d64a7" alt="SkySecLogo" width="200">  
</div>

## Docker İle Ayağa Kaldırma

1. **Docker Engine'in kurulu ve çalışıyor olduğundan emin ol:**

2. **console'u aç ve çalıştır:**
   ```sh
   - cd .../jwt
   - docker compose up --build
   ```

3. **Tarayıcıda görüntüle:**
   ```sh
   - frontend  -->  http://localhost:8080
   - backend   -->  http://localhost:7106/swagger/index.html
   ```

## CTF Çözümü

1. **Login sayfasına git:**
   ```sh
   .../login
   ```

2. **Burp Suite ile dinlemeye başla:**

3. **Sağlanan bilgiler ile giriş yap ve token'ı yakala:**
   ```sh
   {
     "token": "...",
     "homework": "..."
   }
   ```

4. **Token'ı çöz:**
   ```sh
   https://jwt.io sitesini kullanarak token içeriğine bak. (HS256)
   {
     "nameid": "...",
     "role": "...",
     "nbf": "...",
     "exp": "...",
     "iat": "...",
   }
   ```

5. **Rol alanını https://gchq.github.io/CyberChef/ ile çöz:**
   ```sh
   sonuç  -->  student (FROM Base64)
   ```

6. **To Base64 seçerek 'teacher' şifrele:**
   ```sh
   sonuç  -->  dGVhY2hlcg==
   ```

7. **Teacher karşılığını jwt.io'da rol kısmına yapıştır ve Encoded alanı kopyala:**

8. **Burp Suite'de token'ı güncelle ve paketin geçmesine izin ver:**

9. **Gobuster ile buton yönlendirmesi olmayan sayfaları keşfet:**
   ```sh
   gobuster dir --url http://<IP-ADDRESS> -w /usr/share/wordlists/dirb/common.txt
   ```

10. **Keşfedilen .../mPz-students-RsL sayfasına git:**
   ```sh
   Öğrencileri tek tek gezerek 100 alan öğrenciyi bul ve cevabını kopyala.
   ```

11. **Flag'i al:**
   ```sh
   - Kendi bilgilerin ile giriş yap.
   - Kopyaladığın cevabı yapıştır ve ödevi kaydet.
   - Flag window.alert ile gelecek.
   ```


   
