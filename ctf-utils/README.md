# Kullanıcı Bilgilendirmesi

## VPN Ağına Bağlanma

E-posta adresinize gönderilen `wg0.conf` dosyasını `/etc/wireguard` klasörüne koyun, ardından `sudo wg-quick up wg0` komutu ile ağa bağlanın. Herhangi bir sorun yaşamanız durumunda `sudo wg-quick down wg0` komutu ile VPN bağlantısını sonlandırıp `sudo wg-quick up wg0` komutu ile tekrar başlatınız.

## Alan Adlarına Erişim

`/etc/resolv.conf` dosyanız aynen şu şekilde olmalı 

```
nameserver 10.0.0.1
```

dosyayı kaydettikten sonra `CTFd` sayfasına `http://skydays.ctf` adresinden ulaşabilirsiniz.
