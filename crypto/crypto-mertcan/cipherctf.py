import time
import flag

# decrypted message is all lowercase, put it into the flag format.
# flag format is SKYDAYS25{}

timestamp = str(int(time.time()))
digits = []
key = []
alphabet = "{_abcdefghijklmnopqrstuvwxyz0123456789}"
digits = [int(timestamp[i:i+2]) for i in range(0, len(timestamp), 2)]

def cipher(alphabet, cipher, key):
        ciphertext = ""
        for i in range(len(cipher)):
                char = cipher[i]
                index = alphabet.index(char)
                new_index = index + key[i%len(key)]
                ciphertext += alphabet[new_index%len(alphabet)] 
        return ciphertext

for num in digits:
        while num > len(flag):
                key.append(len(flag))
                num -= len(flag)
        key.append(num)

ciphertext = cipher(alphabet, flag, key)
ts = "".join(map(str, key))
timestamp = cipher(alphabet, ts, key)

print(f"Ciphered Key: {timestamp}")
print(f"Ciphered Text: {ciphertext}")
