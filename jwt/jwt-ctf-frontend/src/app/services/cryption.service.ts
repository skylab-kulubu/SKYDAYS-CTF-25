import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, of, Subscriber, switchMap, tap} from "rxjs";
import * as forge from 'node-forge';

@Injectable({
  providedIn: 'root'
})
export class CryptionService {
  private baseApiUrl = 'https://localhost:7106/api/Key';
  private publicKey = new BehaviorSubject<string>("");
  publicKey$ = this.publicKey.asObservable();

  constructor(private httpClient: HttpClient) {
    this.initializePublicKey();
  }

  initializePublicKey(): void {
    this.httpClient.get<string>(`${this.baseApiUrl}/get-public-key`, { responseType: 'text' as 'json' }).pipe(
      tap(key => {
        if (key) {
          this.publicKey.next(key);
          console.log(key)
        } else {
          console.error('Public key is empty.');
        }
      }),
      catchError(error => {
        console.error('Public key not found or another error occurred:', error);
        return of('');
      })
    ).subscribe();
  }

  encrypt(plainText: string): Observable<string> {
    console.log(this.publicKey)
    return this.publicKey$.pipe(
      switchMap(publicKeyPem  => {
        if (!publicKeyPem ) {
          console.error('Public key is not available.');
          return of('');
        }
        
        try {
          const forgePublicKey = forge.pki.publicKeyFromPem(publicKeyPem);

          // Encrypt using RSA with PKCS#1 v1.5 padding
          const plainBytes = forge.util.encodeUtf8(plainText);
          const encryptedBytes = forgePublicKey.encrypt(plainBytes, 'RSAES-PKCS1-V1_5');

          // Convert to base64 string
          const encryptedBase64 = forge.util.encode64(encryptedBytes);
          return of(encryptedBase64);
        } catch (error) {
          console.error('Encryption failed:', error);
          return of('');
        }
      })
    );
  }
  
  /*encryptCustomer(customer: Customer): CipherCustomer {
    const cipherCustomer:CipherCustomer = {
      id: '',
      name: '',
      surname: '',
      phoneNumber: '',
      email: '',
      gender: '',
      profileImageUrl: '',
      birthDate: '',
      openAddress: '',
      cityId: '',
      districtId: '',
      isDeleted: false,
      deletedBy: '',
      rentHistories: []
    }
    this.encrypt(customer.name).subscribe({
      next: (response) => {
        cipherCustomer.name = response;
      }
    });
    this.encrypt(customer.surname).subscribe({
      next: (response) => {
        cipherCustomer.surname = response;
      }
    });
    this.encrypt(customer.phoneNumber).subscribe({
      next: (response) => {
        cipherCustomer.phoneNumber = response;
      }
    });
    this.encrypt(customer.email).subscribe({
      next: (response) => {
        cipherCustomer.email = response;
      }
    });
    this.encrypt(customer.gender).subscribe({
      next: (response) => {
        cipherCustomer.gender = response;
      }
    });
    this.encrypt(customer.openAddress).subscribe({
      next: (response) => {
        cipherCustomer.openAddress = response;
      }
    });
    this.encrypt(customer.birthDate.toISOString()).subscribe({
      next: (response) => {
        cipherCustomer.birthDate = response;
      }
    });
    this.encrypt(customer.cityId.toString()).subscribe({
      next: (response) => {
        cipherCustomer.cityId = response;
      }
    });
    this.encrypt(customer.districtId.toString()).subscribe({
      next: (response) => {
        cipherCustomer.districtId = response;
      }
    });
    return cipherCustomer;
  }*/
  
  public decodeJwt(token: string): { id: string, role: string } {
    if (!token) {
      throw new Error("Token is required");
    }
  
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      throw new Error("Invalid token format");
    }
  
    const payload = JSON.parse(atob(tokenParts[1]));
    const id = payload[ 'nameid' ];  // Backend'de "NameIdentifier" olarak geçiyor
    const encryptedRole = payload[ 'role' ];  // Backend'de şifrelenmiş "role" va
    const role = this.decryptRole(encryptedRole); 
    return { id, role };
  }
  
  private decryptRole(encryptedRole: string): string {
    try {
      return atob(encryptedRole);
    } 
    catch (error) {
      throw new Error("Invalid encrypted role format");
    }
  }
}
