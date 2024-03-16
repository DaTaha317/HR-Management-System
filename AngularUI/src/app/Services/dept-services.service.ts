import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDepartment } from '../interfaces/IDepartment';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DeptServicesService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}
  getDepartments(): Observable<IDepartment[]> {
    return this.http.get<IDepartment[]>(`${this.baseUrl}/department`);
  }
}
