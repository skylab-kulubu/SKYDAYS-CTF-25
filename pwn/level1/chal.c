#include <stdio.h>
#include <stdlib.h>

void sohbet()
{
    char cevap[64] = { 0 };

    gets( &cevap[0] );
    printf( cevap );

    return;
}

int main()
{
    setbuf( stdout, 0 );
    printf( "%s", "Sohbet etmek ister misin?\n" );

    sohbet();

    return 0;
}

void flag()
{
    system("cat flag.txt");
}
