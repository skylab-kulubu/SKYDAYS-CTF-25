import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentLight } from '../models/student-light';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private readonly API_URL = 'https://localhost:7106/api/Teacher';

  constructor(private http: HttpClient) { }

  getStudents(token: string): Observable<StudentLight[]> {
    const headers = { Authorization: token };
    return this.http.get<StudentLight[]>(`${this.API_URL}/GetStudents`, { headers });
  }
}
