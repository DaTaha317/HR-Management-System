import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IMonth } from '../interfaces/IMonth';
import { Observable } from 'rxjs';
import { IPaySlip } from '../interfaces/IPaySlip';

@Injectable({
  providedIn: 'root',
})
export class SalaryService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getSalaryReport(month: IMonth): Observable<any> {
    return this.http.post(`${environment.baseUrl}/Salary`, month);
  }
}
