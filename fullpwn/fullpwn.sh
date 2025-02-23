#!/bin/bash 
set -e

sudo passwd root
sudormrf
skylabharika
skylabharika
sudo su
sudo systemctl enable ssh
sudo systemctl start ssh
echo "SKYDASY25{0mer1n_b1y1g1}" | sudo tee /home/yusuf/user.txt
sudo chmod 600 /home/yusuf/user.txt
echo "SKYDASY25{0_d@ha_haval1}" | sudo tee /root/root.txt
sudo chmod 400 /root/root.txt
chown yusuf:yusuf /home/yusuf/user.txt
chown root:root /root/root.txt
echo "yusuf ALL=(ALL) NOPASSWD: /usr/bin/find" | sudo tee -a /etc/sudoers