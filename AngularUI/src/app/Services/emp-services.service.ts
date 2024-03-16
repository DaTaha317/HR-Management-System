import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEmployee } from '../interfaces/IEmployee';
@Injectable({
  providedIn: 'root'
})
export class EmpServicesService {
  private apiUrl = 'https://localhost:7266/api/employee';
  constructor(private http:HttpClient) { }
  addEmployee(employee: IEmployee): Observable<IEmployee> {
    console.log(employee);
    return this.http.post<any>(this.apiUrl, employee);
  }
  apiCall(){
    return this.http.get(this.apiUrl);
  }

}
