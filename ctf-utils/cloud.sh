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
