#!/bin/bash

# UFW'yi sıfırlayın
ufw reset

# UFW'yi etkinleştir
ufw enable

# Varsayılan politikaları ayarlayın (gelen trafiği engelle, giden trafiğe izin ver)
ufw default deny incoming
ufw default allow outgoing

# 10.0.0.0/16 ağındaki kullanıcılara izin ver (sunuculara istek atabilirler)
ufw allow from 10.0.0.0/16 to 10.10.0.0/16

# 10.10.0.0/16 ağındaki sunuculara izin ver (kullanıcılara istek atabilirler)
ufw allow from 10.10.0.0/16 to 10.0.0.0/16

# 10.10.0.0/16 ağındaki sunucular arasındaki trafiğe izin ver
ufw allow from 10.10.0.0/16 to 10.10.0.0/16

# Kullanıcılar arasındaki trafiği engelle (10.0.0.0/16 ağı için)
ufw deny from 10.0.0.0/16 to 10.0.0.0/16

# UFW'yi yeniden yükle
ufw reload
