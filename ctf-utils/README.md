# HCloud Kurulum

```bash
#!/bin/bash
hcloud network create --name skydays-internal --ip-range 172.16.0.0/24
hcloud network add-subnet --type cloud --network-zone 172.16.0.0/24 skydays-internal
hcloud server create --image ubuntu-24.04 --name skydays-bind --type cpx41 --ssh-key faruk@lomaroid --without-ipv6 --network skydays-internal
hcloud server create --image ubuntu-24.04 --name skydays-vpn --type cpx41 --ssh-key faruk@lomaroid --without-ipv6 --network skydays-internal
hcloud server create --image ubuntu-24.04 --name skydays-questions --type cpx41 --ssh-key faruk@lomaroid --without-ipv6 --network skydays-internal
```

# Kullanıcı Bilgilendirmesi

## VPN Ağına Bağlanma

Wireguard'ı indirin

```bash
sudo apt install wireguard -y
```

E-posta adresinize gönderilen `wg0.conf` dosyasını `/etc/wireguard` klasörüne koyun, ardından `sudo wg-quick up wg0` komutu ile ağa bağlanın. Herhangi bir sorun yaşamanız durumunda `sudo wg-quick down wg0` komutu ile VPN bağlantısını sonlandırıp `sudo wg-quick up wg0` komutu ile tekrar başlatınız.

## Alan Adlarına Erişim

```bash
systemctl stop systemd-resolved.service
```

`/etc/resolv.conf` dosyanız aynen şu şekilde olmalı 

```
nameserver 10.0.0.1
```

dosyayı kaydettikten sonra `CTFd` sayfasına `http://skydays.ctf` adresinden ulaşabilirsiniz.
