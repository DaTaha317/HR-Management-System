import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IRole } from '../interfaces/IRole';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  getAllRoles(): Observable<IRole[]> {
    return this.http.get<IRole[]>(`${this.baseUrl}/SuperAdmin/AllRoles`);
  }

}
