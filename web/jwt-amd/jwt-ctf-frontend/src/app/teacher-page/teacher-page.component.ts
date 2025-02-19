import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentLight } from '../models/student-light';
import { TeacherService } from '../services/teacher.service';
import { CryptionService } from '../services/cryption.service';
import { AuthService } from '../services/auth.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-teacher-page',
  imports: [NgFor, NgIf],
  templateUrl: './teacher-page.component.html',
  styleUrl: './teacher-page.component.css'
})
export class TeacherPageComponent implements OnInit {
  students: StudentLight[] = [];
  errMessage: string = "";
  isLoggedIn: boolean = false;
  constructor(private router: Router, private teacherService: TeacherService, private cryptionService: CryptionService, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.loggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
    const role = this.authService.getRole();
    if(role != "teacher"){
      this.router.navigate(['/']);
    }

    const token = this.authService.getToken();
    if(token != null){
      console.log(token)
      this.cryptionService.encrypt(token).pipe(
        switchMap((encryptedToken) => {
          return this.teacherService.getStudents(encryptedToken);
        })
        ).subscribe({
          next: (response) => {
            this.students = response;
          },
          error: (err) => {
            this.errMessage = "Beklenmeyen bir hata oluştu";
          }
        });  
    }
  }

  viewStudentHomework(studentId: string) {
    const student = this.students.find(s => s.studentId === studentId);
    
    if (!student) {
      console.error('Öğrenci bulunamadı');
      return;
    }
    
    var homework = student.homework;
    
    if (!homework) {
      homework = " ";
    }
    debugger
    this.router.navigate([`/AkI-grade-homework-kEd/${student.studentId}`], { queryParams: { homework: JSON.stringify(homework), grade: student.grade, nameSurname: student.nameSurname} });
  }

  logOut(){
    this.authService.logout();
    this.router.navigate(['/']);
  }
}