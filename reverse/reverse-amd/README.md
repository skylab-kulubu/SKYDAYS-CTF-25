### ReverseEngineeringCtf

<div style="display: flex; justify-content: center; align-items: center; gap: 10px; text-align: center;">
  <img src="https://github.com/user-attachments/assets/3840c01c-c591-4d91-bf11-d84c815d0e8d" alt="SkyLabLogo" width="200">
  <img src="https://github.com/user-attachments/assets/eb3c0dce-2ff7-417e-9497-461a512d64a7" alt="SkySecLogo" width="200">  
</div>

## Proje Kurulumu

### Gereksinimler
- mono

### Kurulum

1. **Mono kur:**
   ```sh
   sudo dnf install mono-core mono-devel
   ```

2. **Executable dosyasına git:**
   ```sh
   cd .../reverse-engineering-ctf/Resources/executable
   ```

3. **Çalıştır:**
   ```sh
   mono ReverseEngineeringCtf.exe
   ```

## Çözüm (Windows)

1. **DnSpy kur:**
   ```sh
   https://github.com/dnSpy/dnSpy/releases
   ```

2. **Çalıştırılabilr dosyayı DnSpy da aç:**
   ```sh
   - dnSpy.exe çalıştır
   - ReverseEngineeringCtf.exe dosyasını sol bölüme sürükle bırak
   ```

3. **Frame kodunu bul ve flag cevabını al:**
   ```sh
   - ReverseEngineeringCtf/FrmQuestion içine gir
   - private readonly string FlagAnswer içeriğini kopyala
   ```

4. **Exe'yi çalıştır ve cevap verip flag'i al:**


## Çözüm (Linux)

1. **:**
   ```sh
   
   ```

