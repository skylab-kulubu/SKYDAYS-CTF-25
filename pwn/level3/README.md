# Docker build etme:

`docker build -t level3d .`

# Docker çalıştırma

mount işlemi vs için capability gerekiyor, başka bir yolu var mı bilmiyorum ama şu anlık capabilit'ler ile çalıştırmalıyız:

`docker run --cap-add=SYS_ADMIN --cap-add=SYS_PTRACE --security-opt seccomp=unconfined --rm -p 9003:1337 --name level3 level3d`

Dikkat ederseniz, bu komut `-d`eteach modda çalışmıyor, istenilirse `-d` eklenebilir.

Level 3 için `9003` portunda çalışıyor, değiştirilmek istenirse `solution.py`'de de değiştirilmeli.

Sağlık kontrolü için `./solution.py` çalıştırılabilir.
