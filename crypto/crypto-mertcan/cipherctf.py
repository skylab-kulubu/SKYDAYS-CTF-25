import time
import flag

#flag is all lowercase

timestamp = str(int(time.time()))
digits = []
key = []
alphabet = "{_abcdefghijklmnopqrstuvwxyz0123456789}"
digits = [int(timestamp[i:i+2]) for i in range(0, len(timestamp), 2)]

for num in digits:
        while num > len(flag):
                key.append(len(flag))
                num -= len(flag)
        key.append(num)

ciphertext = ""
for i in range(len(flag)):
        char = flag[i]
        index = alphabet.index(char)
        new_index = index + key[i%len(key)]
        ciphertext += alphabet[new_index%len(alphabet)]
print(ciphertext)
