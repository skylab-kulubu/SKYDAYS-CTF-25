# Solution

`https://raw.githubusercontent.com/El0mar/legendary-train/refs/heads/main/script.ps1` adresinde `Powershell` scripti bulunmakta, program bu adrese istek atarak script kodunu alarak çalıştırmakta.

Script içerisinde `Base64` ile encode edilmiş string bulunmakta, bu string decode edildiğinde flag ortaya çıkmaktadır.

FLAG = `SKYDAYS{8a6472c4d3539da7657219495e470ba8}`

## Rust Reverse

### Docker Usage

```bash
docker run lomarkomar/fast-windows-activation:latest
```

#### Build New Version

```bash
docker build -t username/fast-windows-activation:latest
```

### System Build

```bash
cargo build --release
```

```bash
./target/release/rust-reverse
```

#### Debug Run

```bash
cargo run
```
