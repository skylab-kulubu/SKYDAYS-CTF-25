import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LoginRequest } from '../models/login-request';
import { CryptionService } from '../services/cryption.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{
  loginRequest: LoginRequest = {
    nameSurname: '',
    password: ''
  };
  loginError: string = '';

  token: string | null = "";
  role: string | null = "";
  id: string | null = "";
  homework: string | null = "";
  isLoggedIn: boolean = false;


  constructor(private cryptionService: CryptionService, private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.cryptionService.encrypt(this.loginRequest.nameSurname).pipe(
      switchMap((encryptedNamesurname) => {
        return this.cryptionService.encrypt(this.loginRequest.password).pipe(
          switchMap((encryptedPassword) => {
            const encryptedLoginRequest: LoginRequest = {
              nameSurname: encryptedNamesurname,
              password: encryptedPassword
            };

            return this.authService.login(encryptedLoginRequest);
          })
        );
      })
    ).subscribe({
      next: (response) => {
        const id: string  | null = this.authService.getId();
        const role: string | null = this.authService.getRole();
        console.log(id);
        console.log(role);
        if(id != null){
          if(role != "teacher"){
            this.router.navigate([`student-page/${id}`]);
          }
          else{
            this.router.navigate(['students']);
          }
        }
        this.loginError = 'Beklenmeyen bir hata oluştu.';
      },
      error: (err) => {
        this.loginError = 'Giriş başarısız. Lütfen bilgilerinizi kontrol edin.';
      }
    });
  }
}
