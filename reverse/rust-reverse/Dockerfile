FROM rust:latest

# MinGW yükle
RUN apt update && apt install -y mingw-w64

# Windows hedefini ekle
RUN rustup target add x86_64-pc-windows-gnu

# Çalışma dizini oluştur ve kodları buraya kopyala
WORKDIR /usr/src/app
COPY . .

# Windows için derleme
RUN cargo build --target x86_64-pc-windows-gnu --release

# Çıktıyı bir çıkış dizinine kopyala
RUN mkdir -p /output && cp target/x86_64-pc-windows-gnu/release/*.exe /output/

# Çıktıyı mount edebilmek için boş bir komut bırakıyoruz
CMD ["echo", "Build completed. Find your executable in /output"]
