import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, of, Subscriber, switchMap, tap} from "rxjs";
import * as forge from 'node-forge';
import { apiUrl } from './api-url';

@Injectable({
  providedIn: 'root'
})
export class CryptionService {
  private apiName = 'Key';
  private publicKey = new BehaviorSubject<string>("");
  publicKey$ = this.publicKey.asObservable();

  constructor(private httpClient: HttpClient) {
    this.initializePublicKey();
  }

  initializePublicKey(): void {
    this.httpClient.get<string>(`${apiUrl}/${this.apiName}/get-public-key`, { responseType: 'text' as 'json' }).pipe(
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
