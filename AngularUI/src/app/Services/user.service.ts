import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IApplicationUser } from '../interfaces/IApplicationUser';
import { Observable } from 'rxjs';
import { IRegister } from '../interfaces/IRegister';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseURL = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<IApplicationUser[]> {
    return this.http.get<IApplicationUser[]>(
      `${this.baseURL}/SuperAdmin/GetUsers`
    );
  }

  addUser(user: IRegister): Observable<any> {
    return this.http.post<any>(
      `${this.baseURL}/ApplicationUser/register`,
      user
    );
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(
      `${this.baseURL}/SuperAdmin/DeleteUser?userId=${id}`
    );
  }
}
