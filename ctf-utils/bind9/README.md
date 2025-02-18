```bash
sudo apt update
sudo apt install bind9 bind9utils bind9-doc dnsutils
```
```bash
sudo vim  /etc/bind/named.conf
include "/etc/bind/named.conf.local";
include "/etc/bind/named.conf.options";
```

```bash
sudo vim /etc/bind/named.conf.local
zone "skydays.ctf" {
    type master;
    file "/etc/bind/db.skydays.ctf";
};
```

```bash
sudo vim /etc/bind/named.conf.options
options {
    directory "/var/cache/bind";

    forwarders {
        8.8.8.8;
        8.8.4.4;
    };

    allow-query { any; };
    recursion yes;
    listen-on { any; };
    listen-on-v6 { any; };
};

```

```bash 
sudo vim /etc/bind/db.skydays.ctf
$TTL    604800
@       IN      SOA     ns1.skydasys.ctf. admin.skydays.ctf. (
                              2023021701 ; Serial
                              604800     ; Refresh
                              86400      ; Retry
                              2419200    ; Expire
                              604800 )   ; Negative Cache TTL
;
@       IN      NS      ns1.skydays.ctf.
@       IN      NS      ns2.skydays.ctf.
@       IN      A       192.168.1.1
ns1     IN      A       192.168.1.1
ns2     IN      A       192.168.1.2
www     IN      A      10.0.0.1

```

```bash
sudo systemctl restart bind9
sudo systemctl enable bind9

```
