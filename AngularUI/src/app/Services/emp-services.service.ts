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
  addEmployee(employeeDTO: any): Observable<any> {
    console.log(employeeDTO);
    return this.http.post<any>(this.apiUrl, employeeDTO);
  }
  apiCall(){
    return this.http.get(this.apiUrl);
  }

}
