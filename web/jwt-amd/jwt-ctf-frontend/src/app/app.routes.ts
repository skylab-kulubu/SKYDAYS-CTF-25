import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { StudentPageComponent } from './student-page/student-page.component';
import { GradingPageComponent } from './grading-page/grading-page.component';
import { TeacherPageComponent } from './teacher-page/teacher-page.component';
import { MainPageComponent } from './main-page/main-page.component';

export const routes: Routes = [
    { path: '', component: MainPageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'student-page/:id', component: StudentPageComponent },
    { path: 'students', component: TeacherPageComponent},
    { path: 'grade-homework/:id', component: GradingPageComponent }
];
