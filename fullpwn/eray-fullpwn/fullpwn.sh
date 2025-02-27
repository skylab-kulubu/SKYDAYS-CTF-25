#!/bin/bash

apt update -y
apt upgrade -y

# Şifreler Sonradan Belirlenecek
ROOT_PASS='eray123'
USER_PASS='yusuf123'

printf "$ROOT_PASS\n$ROOT_PASS\n"| sudo passwd root

# Yusuf - User Flag
useradd -p $USER_PASS -m yusuf

echo "yusuf ALL=(ALL) NOPASSWD: /usr/bin/find" | sudo tee -a /etc/sudoers

echo "SKYDAYS{0mer1n_b1y1g1}" | sudo tee /home/yusuf/user.txt

chown yusuf:yusuf /home/yusuf/user.txt

chmod 600 /home/yusuf/user.txt

# Root Flag

echo "SKYDAYS{0_d@ha_haval1}" | sudo tee /root/root.txt

chmod 400 /root/root.txt

chown root:root /root/root.txt

# Start SSH
systemctl enable ssh --now
