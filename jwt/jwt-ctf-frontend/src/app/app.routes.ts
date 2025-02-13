import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { StudentPageComponent } from './student-page/student-page.component';
import { GradingPageComponent } from './grading-page/grading-page.component';
import { TeacherPageComponent } from './teacher-page/teacher-page.component';
import { DummyTeacherPageComponent } from './dummy-teacher-page/dummy-teacher-page.component';
import { MainPageComponent } from './main-page/main-page.component';

export const routes: Routes = [
    { path: '', component: MainPageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'student-page/:id', component: StudentPageComponent },
    { path: 'students', component: DummyTeacherPageComponent},
    { path: 'mPz-students-RsL', component: TeacherPageComponent },
    { path: 'AkI-grade-homework-kEd/:id', component: GradingPageComponent }
];
