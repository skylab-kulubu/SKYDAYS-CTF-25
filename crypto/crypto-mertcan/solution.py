import cipherkey
import cipheredtext
alphabet = "{_abcdefghijklmnopqrstuvwxyz0123456789}"


def cipher(alphabet, cipher, key):
        ciphertext = ""
        for i in range(len(cipher)):
                char = cipher[i]
                index = alphabet.index(char)
                new_index = index + key[i%len(key)]
                ciphertext += alphabet[new_index%len(alphabet)] 
        return ciphertext

def decipher(alphabet, text, key):
    plaintext = ""
    for i, char in enumerate(text):
        idx = alphabet.index(char)
        new_idx = (idx - key[i % len(key)]) % len(alphabet)
        plaintext += alphabet[new_idx]
    return plaintext

for tsbegin in range(1740000000, 1750000000):
	key = []
	digits = []
	digits = [int(str(tsbegin)[i:i+2]) for i in range(0, len(str(tsbegin)), 2)]
	for num in digits:
	        while num > 28:		# len(flag) is 28
        	        key.append(28)
                	num -= 28
	        key.append(num)
	ts = "".join(map(str, key))
	og_key = cipher(alphabet, ts, key)
	if(og_key == cipherkey):
		timestamp = tsbegin
		break;

flag = decipher(alphabet, cipheredtext, key)
print(flag)
