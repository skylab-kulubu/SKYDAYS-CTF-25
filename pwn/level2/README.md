# Docker build etme:

`docker build -t level2d .`

# Docker çalıştırma

mount işlemi vs için capability gerekiyor, başka bir yolu var mı bilmiyorum ama şu anlık capabilit'ler ile çalıştırmalıyız:

`docker run --cap-add=SYS_ADMIN --cap-add=SYS_PTRACE --security-opt seccomp=unconfined --rm -p 9002:1337 --name level2 level2d`

Dikkat ederseniz, bu komut `-d`eteach modda çalışmıyor, istenilirse `-d` eklenebilir.

Level 2 için `9002` portunda çalışıyor, değiştirilmek istenirse `solution.py`'de de değiştirilmeli.

Sağlık kontrolü için `./solution.py` çalıştırılabilir.
