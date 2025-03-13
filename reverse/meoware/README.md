# Çözüm

Program `resources` dosyasındaki resim dosyalarını göstermektedir.
Bu resim dosyalarının bazılarının içine steganografi ile veri saklanmıştır
ve program shellcode'u belirli bir algoritma ile resimlerden çıkartır.

`Ida` veya `Ghidra` ile progam incelendiği zaman shellcode'un 
çıkartılma algoritması bulunabilir ve aynı algoritma ile shellcode'un
tamamı elde edilebilir.

Elde edilen koda `hexdump` ile bakıldığı zaman içerideki gizli mesaj bize
aynı steganografi algoritmasını diğer resimlerde de denememiz gerektiğini
belli eder.

Bu işlem yapılınca resimlerden biri flag'i vericektir.

flag: `SKYDAYS{purrf3ct_m4lw4r3}`
