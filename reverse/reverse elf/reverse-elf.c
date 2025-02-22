
#include <stdio.h>
#include <string.h>

int main() {
    char aes[20];
    char aeskey[] = "a73e7606977366e5";
    char flag[] = "128bithemde";

    printf("Şifreyi giriniz: ");
    scanf("%19s", aes);

    if (strcmp(aes, aeskey) == 0) {
        printf("NnSInu4+QXY4gfT46i92ZBFsrZUZPYKsracgmVuxFT0=\n");
    }
    else if (strcmp(aes, flag) == 0) {
        printf("AES olabilir mi? - CBC - PKCS5Padding - No IV\n");}
    else {
        printf("Tekrar deneyin.\n");
    }

    return 0;
}
