import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../services/student.service';
import { SaveHomeworkRequest } from '../models/save-homework-request';
import { AuthService } from '../services/auth.service';
import { CryptionService } from '../services/cryption.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-student-page',
  imports: [NgIf, FormsModule],
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.css']
})
export class StudentPageComponent implements OnInit {
  saveHomeworkRequest: SaveHomeworkRequest = {
    studentId: '',
    password: '',
    homework: ''
  }
  savedMessage: string = '';
  isSaveClicked: boolean = false;
  isLoggedIn: boolean = false;

  constructor(
    private studentService: StudentService,
    private router: Router,
    private authService: AuthService,
    private cryptionService: CryptionService
  ) {}

  ngOnInit(): void {
    this.authService.loggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
    const role = this.authService.getRole();
    if(role != "student"){
      this.router.navigate(['/']);
    }
    var id = this.authService.getId();
    if(id != null){
      this.saveHomeworkRequest.studentId = id;
    }
    var homework = this.authService.getHomework();
    if(homework != null){
      this.saveHomeworkRequest.homework = homework;
    }
  }

  saveProgress() {
    this.isSaveClicked = true;
  }

  updateApproved() {
    this.savedMessage = "";
    this.cryptionService.encrypt(this.saveHomeworkRequest.password).pipe(
      switchMap((encryptedPassword) => {
        const encryptedSaveHomeworkRequest: SaveHomeworkRequest = {
          studentId: this.saveHomeworkRequest.studentId,
          password: encryptedPassword,
          homework: this.saveHomeworkRequest.homework
        };

        return this.studentService.saveHomework(encryptedSaveHomeworkRequest);
      })
    ).subscribe({
      next: (response) => {
        debugger
        const pattern = /^.*\{.*\}$/;
        if (pattern.test(response)) {
          window.alert(response);
        } 
        else if(response === "equal"){
          this.authService.setHomework(this.saveHomeworkRequest.homework);
        }
        else{
          this.savedMessage = "Beklenmeyen bir hata oluştu";
        }
      },
      error: (err) => {
        debugger
        this.savedMessage = "Güncelleme sırasında bir hata oluştu";
      }
    });  
  }

  logOut(){
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
