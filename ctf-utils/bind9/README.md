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
$TTL 86400
@   IN  SOA ns.skydays.ctf. admin.skydays.ctf. (
        2024030801  ; Serial
        3600        ; Refresh
        1800        ; Retry
        604800      ; Expire
        86400 )     ; Minimum TTL

    IN  NS  ns.skydays.ctf.
ns  IN  A   10.0.0.1
@   IN  A   10.0.0.1

```

```bash
sudo systemctl restart bind9
sudo systemctl enable bind9

```
