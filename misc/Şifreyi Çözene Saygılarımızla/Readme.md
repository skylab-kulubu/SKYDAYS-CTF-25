Soruda cucehacker'dan bir mesaj var gibi görünüyor, internette bu ismi arattığımızda bir github profiliyle karşılaşıyoruz. 
![image](https://github.com/user-attachments/assets/042cb1ae-4846-431a-9970-422fe16712d9)

Flag olabileceği tahmin edilen ilk repositoride qr kod okutulduğunda rabbit hole olduğunu anlıyoruz. 
İkinci repositori boş görünüyor fakat historyde bir qr kod mevcut. Okutulduğunda " anahtarımı düşürdüm bioya bi baksana" yazmakta.

![image](https://github.com/user-attachments/assets/2e46c19e-66ea-4305-a2d8-9af970a570bb)

Burası aklımızda bulunsun. Diğer repositoriye bakalım.
![image](https://github.com/user-attachments/assets/d5d2bf2f-9091-4301-b8fc-522e032880f2)


Bu repositoride 16 parçaya ayrılmış ve karıştırılmış bir qr kod mevcut.Qr kod yapısını öğrenerek bu qr ı birleştirebilirsiniz. Görselin boyutu 964 x 964 piksel, her bir modülün (küçük karelerin) uzunluğu yaklaşık 23.51 piksel. Buna göre birleştirme yapıldığında doğru sonucu görebilirsiniz.
Kaynak olması açısından bu videoya bakılabilir. https://youtu.be/142TGhaTMtI?si=e0gcZqxOhmY1DHSs 

Birleştirilmiş görüldüğü gibidir.
![qr2](https://github.com/user-attachments/assets/50be394d-1809-49b3-8bae-2f17ab91c0f1)


Qr okutulduğunda şifreli bir mesaj çıkıyor. Karışık olan qr ı ilk aldığımız dosyanın ismi "double.md" olduğu için bu metnin iki kere şifrelendiği düşülünebilir. Ayrıca hesabın biyografi kısmında yazan "en sevdiğim kelime skydays en sevdiğim rakam 7" ifadesi de bunu doğrular.
Metni cyberchef aracına atıp vigenere decode seçip key olarak skydays girdiğinizde tekrardan şifreli bir mesajla karşılaşıyorsunuz. 
![image](https://github.com/user-attachments/assets/d7468ede-6a5a-49c4-91a5-942d74b005bb)

Sezar şifreleme olduğu ve alfabede 7 ileri ya da geri gidilerek şifrelendiği düşülünebilir. Flag formatının SKYDAYS{} olduğunu biliyoruz. Tek tek geriye gidildiğinde flag ortaya çıkmaktadır.

ZREİGEZ{z4el1s1fs1l1_3yhcş3tb_h0f3y}

SKYDAYS{s4yg1s1zl1g1_3rcum3nt_c0z3r}
