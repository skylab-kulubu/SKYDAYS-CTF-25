#!/bin/bash

sed -i.bak "s/IPV6=yes/IPV6=no/g" /etc/default/ufw

ufw reset

ufw default deny incoming
ufw default allow outgoing

ufw allow ssh
ufw allow from 10.0.0.0/16 to 10.0.0.0/16
ufw allow from 10.0.0.0/16 to 10.10.0.0/16
ufw allow from 10.10.0.0/16 to 10.0.0.0/16
ufw deny from 10.10.0.0/16 to 10.10.0.0/16
ufw allow 5000
ufw allow 51820/udp

ufw reload

ufw enable

# Wireguard Logs
iptables -I FORWARD -i wg0 -j LOG --log-prefix 'tunnel wireguard iptables: ' --log-level 7
iptables -I FORWARD -o wg0 -j LOG --log-prefix 'tunnel wireguard iptables: ' --log-level 7
