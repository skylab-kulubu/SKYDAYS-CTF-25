# HCloud Kurulum

```bash
#!/bin/bash
SSH_KEY="faruk@lomaroid"
hcloud network create --name skydays-internal --ip-range 172.16.0.0/24
hcloud network add-subnet --type cloud --network-zone eu-central skydays-internal
hcloud server create \
  --image ubuntu-24.04 \
  --type cpx41 \
  --ssh-key $SSH_KEY \
  --without-ipv6 \
  --network skydays-internal \
  --name skydays-bind

hcloud server create \
  --image ubuntu-24.04 \
  --type cpx41 \
  --ssh-key $SSH_KEY \
  --without-ipv6 \
  --network skydays-internal \
  --name skydays-vpn

hcloud server create \
  --image ubuntu-24.04 \
  --type cpx41 \
  --ssh-key $SSH_KEY \
  --without-ipv6 \
  --network skydays-internal \
  --name skydays-questions
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

```plaintext
nameserver 10.0.0.1
```

dosyayı kaydettikten sonra `CTFd` sayfasına `http://skydays.ctf` adresinden ulaşabilirsiniz.
