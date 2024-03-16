import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEmployee } from '../interfaces/IEmployee';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class EmpServicesService {
  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}
  addEmployee(employee: IEmployee): Observable<IEmployee> {
    return this.http.post<any>(`${this.baseUrl}/employee`, employee);
  }
  apiCall() {
    return this.http.get(`${this.baseUrl}/employee`);
  }
}
