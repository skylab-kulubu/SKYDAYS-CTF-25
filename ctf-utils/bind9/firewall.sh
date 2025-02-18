#!/bin/bash

# UFW'yi sıfırlayın
ufw reset

# UFW'yi etkinleştir
ufw enable

# Varsayılan politikaları ayarlayın (gelen trafiği engelle, giden trafiğe izin ver)
ufw default deny incoming
ufw default allow outgoing

ufw allow from 10.0.0.0/8
ufw allow 22

# UFW'yi yeniden yükle
ufw reload
