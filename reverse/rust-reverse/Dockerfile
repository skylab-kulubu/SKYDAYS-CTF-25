FROM rust:latest

RUN apt update && apt install -y mingw-w64

RUN rustup target add x86_64-pc-windows-gnu
RUN rust target add x86_64-unknown-linux-gnu

WORKDIR /usr/src/app
COPY . .

RUN cargo build --target x86_64-pc-windows-gnu --release
RUN cargo build --target x86_64-unknown-linux-gnu --release

RUN mkdir -p /output && \
  cp target/x86_64-pc-windows-gnu/release/*.exe /output/ && \
  cp target/x86_64-unknown-linux-gnu/release/* /output/

CMD ["echo", "Build completed. Find your executable in /output"]
