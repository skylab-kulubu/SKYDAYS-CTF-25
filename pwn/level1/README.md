# Docker build etme:

`docker build -t level1d .`

# Docker çalıştırma

mount işlemi vs için capability gerekiyor, başka bir yolu var mı bilmiyorum ama şu anlık capabilit'ler ile çalıştırmalıyız:

`docker run --cap-add=SYS_ADMIN --cap-add=SYS_PTRACE --security-opt seccomp=unconfined --rm -p 9001:1337 --name level1 level1d`

Dikkat ederseniz, bu komut `-d`eteach modda çalışmıyor, istenilirse `-d` eklenebilir.

Level 1 için `9001` portunda çalışıyor, değiştirilmek istenirse `solution.sh`'de de değiştirilmeli.

Sağlık kontrolü için `./solution.sh` çalıştırılabilir.
