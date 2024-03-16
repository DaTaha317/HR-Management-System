import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class DaysOffService {
  private apiUrl = 'https://localhost:7266';

  constructor(private http: HttpClient) { }

  addDayOff(dayOff:any): Observable<any> {
    console.log("add seveise work")
    return this.http.post<any>(`${this.apiUrl}/api/DaysOff`, dayOff);
    
  }

  getAllDaysOff(): Observable<any[]> {console.log("getall seveise work")
    return this.http.get<any[]>(`${this.apiUrl}/api/DaysOff`);
    
  }

  deleteDayOff(day: Date): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/api/DaysOff/${day}`);
  }
  updateDayOff(dayOff: any): Observable<any> {
    console.log("update seveise work")
    return this.http.put<any>(`${this.apiUrl}/api/DaysOff/${dayOff.date}`, dayOff);
  }
}

