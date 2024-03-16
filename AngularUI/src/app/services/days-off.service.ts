import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DaysOffService {
  private apiUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  addDayOff(dayOff: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/DaysOff`, dayOff);
  }

  getAllDaysOff(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/DaysOff`);
  }

  deleteDayOff(day: Date): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/DaysOff/${day}`);
  }
  updateDayOff(dayOff: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/DaysOff/${dayOff.date}`, dayOff);
  }
}
