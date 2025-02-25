FROM rust:slim AS builder

WORKDIR /usr/src/rust-reverse

RUN apt-get update -y && apt-get install pkg-config libssl-dev -y

COPY . .

RUN cargo build --release

FROM ubuntu:24.10

COPY --from=builder /usr/src/rust-reverse/target/release/rust-reverse /usr/local/bin/rust-reverse

CMD [ "rust-reverse" ]
