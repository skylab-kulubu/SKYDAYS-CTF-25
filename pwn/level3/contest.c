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
    puts( "Sohbet etmek ister misin?\n" );

    while ( 1 )
    {
        sohbet();
    }

    return 0;
}

void callme() {
  asm volatile ("pop %%rdi\n\t"
      "ret"
      :
      :
      : "rdi");
}

int calc()
{
    return 8 + 7;
}
