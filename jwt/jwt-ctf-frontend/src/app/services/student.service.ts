import { Injectable } from '@angular/core';
import { SaveHomeworkRequest } from '../models/save-homework-request';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseApiUrl = 'https://localhost:7106/api/Student';
  constructor(private httpClient: HttpClient) { }

  saveHomework(saveHomeworkRequest: SaveHomeworkRequest): Observable<string>{
    return this.httpClient.post<any>(this.baseApiUrl + '/SaveMyHomework', saveHomeworkRequest, { responseType: 'text' as 'json' });
  }
}
