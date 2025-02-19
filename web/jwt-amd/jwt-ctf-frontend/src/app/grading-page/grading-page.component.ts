import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgClass, NgIf } from '@angular/common';
import { StudentLight } from '../models/student-light';

@Component({
  selector: 'app-grading-page',
  imports: [FormsModule, NgIf, NgClass],
  templateUrl: './grading-page.component.html',
  styleUrl: './grading-page.component.css'
})
export class GradingPageComponent implements OnInit {
  studentId: number = 0;
  studentName: string = '';
  homework: string = 'Öğrencinin yazdığı ödev burada görünecek.';
  grade: number = 0;
  newGrade: number = 0;
  isLoggedIn: boolean = false;

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.loggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
    const role = this.authService.getRole();
    if(role != "teacher"){
      this.router.navigate(['/']);
    }
    debugger
    this.route.queryParams.subscribe(params => {
      if (params['homework']) {
        this.homework = JSON.parse(params['homework']);
      }
    });
    this.route.queryParams.subscribe(params => {
      if (params['grade']) {
        this.grade = params['grade'];
      }
    });
    this.route.queryParams.subscribe(params => {
      if (params['nameSurname']) {
        this.studentName = params['nameSurname'];
      }
    });
    
    this.newGrade = this.grade;
  }

  submitGrade() {
    // Burada puanı kaydedebiliriz (API'ye gönderme veya yerel depolama)
    console.log(`Öğrenciye verilen puan: ${this.grade}`);
  }

  logOut(){
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
