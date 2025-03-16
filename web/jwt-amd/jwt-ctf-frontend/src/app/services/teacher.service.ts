import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentLight } from '../models/student-light';
import { apiUrl } from './api-url';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private apiName = 'Teacher';

  constructor(private http: HttpClient) { }

  getStudents(token: string): Observable<StudentLight[]> {
    const headers = { Authorization: token };
    return this.http.get<StudentLight[]>(`${apiUrl}/${this.apiName}/GetStudents`, { headers });
  }
}
