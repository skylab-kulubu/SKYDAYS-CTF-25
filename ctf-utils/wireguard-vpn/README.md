# Install Docker

```bash
sudo apt update -y
sudo apt upgrade -y
curl https://get.docker.com|bash
sudo apt install wireguard -y
```

# Prepare compose.yml

## Run Containers


```bash
export EMAIL_ADDRESS='yourmail@gmail.com'
export APPLICATION_PASSWORD='your app password here'
docker compose up -d
```

Now go to `http://server-ip:5000`
