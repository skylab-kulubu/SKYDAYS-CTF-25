## SKYDAYS25 - JWT CTF

### Çözüm

1. **Ana Sayfa'ya git:**
   ```sh
   http://www.dizci.ctf
   ```

2. **Giriş bilgilerini al ve login sayfasına git:**
   ```sh
   http://www.dizci.ctf/login
   ```

3. **Burp Suite ile dinlemeye başla:**

4. **Sağlanan bilgiler ile giriş yap ve token'ı yakala:**
   ```sh
   {
     "token": "...",
     "homework": "..."
   }
   ```

5. **Token'ı çöz:**
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

6. **Rol alanını https://gchq.github.io/CyberChef/ ile çöz:**
   ```sh
   sonuç  -->  student (FROM Base64)
   ```

7. **To Base64 seçerek 'teacher' şifrele:**
   ```sh
   sonuç  -->  dGVhY2hlcg==
   ```

8. **Teacher karşılığını jwt.io'da rol kısmına yapıştır ve Encoded alanı kopyala:**

9. **Burp Suite'de token'ı güncelle ve paketin geçmesine izin ver:**

10. **Gobuster ile buton yönlendirmesi olmayan sayfaları keşfet:**
   ```sh
   gobuster dir --url http://www.dizci.ctf -w /usr/share/wordlists/dirb/common.txt
   ```

11. **Keşfedilen www.dizci.ctf/mPz-students-RsL sayfasına git:**
   ```sh
   Öğrencileri tek tek gezerek 100 alan öğrenciyi bul ve cevabını kopyala.
   ```

12. **Flag'i al:**
   ```sh
   - Sağlanan bilgiler ile giriş yap.
   - Kopyaladığın cevabı yapıştır ve ödevi kaydet.
   - Flag window.alert ile gelecek.
   ```
   
