# Çözüm

Dosyanın metadatasında `comment = bjBUX3RoM2ZsNGcw` bulunur.
Base64 ile decode edildiğinde `n0T_th3fl4g0` stringi elde edilir.

Verilen mp4'teki frameler ayrıştırıldığında bazı framelerde kararmalar olduğu görülür.
Siyah frameler 0, normal frameler 1 ile temsil edildiğinde binary bir data saklandığı anlaşılır.
Çözüldüğünde 256 bitlik bir binary ortaya çıkar.

`0000011000101111001001010010110100111011000000100110101100111011000000000000000000010100001000000000001101110100001100100000111100110001011101100011011000000010000000010101101101111011001110100001100001011000000111000000001000101100011101110001111100000001`

`n0T_th3fl4g0` stringi 96 bit, onun encoded versiyonu `bjBUX3RoM2ZsNGcw` ise 128 bit. `bjBUX3RoM2ZsNGcw`, bulunan
binarynin bir yarısı ile aynı büyüklükte olduğundan one time pad olarak şifrelenmiş olabilir.

Binarynin ilk yarısı ile xorlamayı denediğimizde bu stringi elde ediyoruz:
`dEgxc19TM2NSM3Qx`
Bunu yine base64 ile decode ettiğimizde ise bunu buluyoruz:
`tH1s_S3cR3t1`

One time padde kullanılan key'i bulduk. Şimdi binarynin kalan yarısı ile bu key'i xorlarsak diğer plaintexti
bulabiliriz. Bit sayısının 128 olması gerektiği için base64 encoded versiyonu kullanacağız.
Sonuç = `U3QzbjBnUjRQaDNy`
Decode edersek = `St3n0gR4Ph3r`

Flag = `SKYDAYS25{St3n0gR4Ph3r}`
