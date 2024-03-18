import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAttendence } from '../interfaces/IAttendence';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  addAttendance(attendance: IAttendence): Observable<IAttendence> {
    return this.http.post<IAttendence>(
      `${this.baseUrl}/Attendance`,
      attendance
    );
  }
}
