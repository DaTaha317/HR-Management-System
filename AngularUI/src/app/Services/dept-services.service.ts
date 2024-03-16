import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDepartment } from '../interfaces/IDepartment';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class DeptServicesService {
  constructor(private http:HttpClient) { }
  apiCall():Observable<IDepartment[]>{
    return this.http.get<IDepartment[]>("https://localhost:7266/api/department");
  }
  
}
