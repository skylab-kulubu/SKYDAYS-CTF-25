import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CryptionService } from './cryption.service';
import { LoginRequest } from '../models/login-request';
import { LoginAnwser } from '../models/login-answer';
import { switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseApiUrl = 'https://localhost:7106/api/Auth';
  private role: string | null = null;
  private id: string | null = null;
  private homework: string | null = null;
  private token: string | null = null;
  private loggedIn = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient, private cryptionService: CryptionService) {
    this.role = localStorage.getItem('userRole');
    this.id = localStorage.getItem('id');
    this.homework = localStorage.getItem('homework');
    this.token = localStorage.getItem('token');
    if(this.token != null){
      this.loggedIn.next(true);
    }
  }
  login(loginRequest: LoginRequest): Observable<LoginAnwser> {
    return this.http.post<LoginAnwser>(`${this.baseApiUrl}/login`, loginRequest).pipe(
      tap((response: LoginAnwser) => {
        if (response.token) {
          this.handleLoginResponse(response);
          this.setLoggedInTrue();
        }
      })
    );
  }

  setLoggedInTrue(){
    this.loggedIn.next(true);
  }

  handleLoginResponse(response: LoginAnwser): void {
    const jwtInfo: {id: string, role: string} = this.cryptionService.decodeJwt(response.token);
    localStorage.setItem('token', response.token);
    localStorage.setItem('id', jwtInfo.id);
    localStorage.setItem('userRole', jwtInfo.role);
    localStorage.setItem('homework', response.homework);
  }

  getRole(): string | null {
    return localStorage.getItem('userRole');
  }

  getId(): string | null {
    return localStorage.getItem('id');
  }

  getHomework(): string | null {
    return localStorage.getItem('homework');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setHomework(homework: string){
    localStorage.setItem('homework', homework);
  }

  logout(): void {
    this.deleteToken()
    this.loggedIn.next(false);
  }

  deleteToken(): void{
    localStorage.removeItem('userRole');
    localStorage.removeItem('id');
    localStorage.removeItem('homework');
    localStorage.removeItem('token');
    this.role = null;
    this.id = null;
    this.homework = null
  }
}
