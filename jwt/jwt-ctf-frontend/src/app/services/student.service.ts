import { Injectable } from '@angular/core';
import { SaveHomeworkRequest } from '../models/save-homework-request';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from './api-url';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiName = 'Student';
  constructor(private httpClient: HttpClient) { }

  saveHomework(saveHomeworkRequest: SaveHomeworkRequest): Observable<string>{
    return this.httpClient.post<any>(`${apiUrl}/${this.apiName}/SaveMyHomework`, saveHomeworkRequest, { responseType: 'text' as 'json' });
  }
}
