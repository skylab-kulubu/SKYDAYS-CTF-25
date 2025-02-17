```bash
# Clone CTFd 
git clone https://github.com/CTFd/CTFd.git ~/.ctfd
cd ~/.ctfd
# Install Neon Theme 
git clone https://github.com/chainflag/ctfd-neon-theme.git ~/.ctfd/CTFd/themes/neon

# Start CTFd On Port 80
docker compose up -d --force-recreate --build
```
