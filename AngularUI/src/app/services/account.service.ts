import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { IDepartment } from '../interfaces/IDepartment';
import { IUser } from '../interfaces/IUser';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private currentUserSource = new BehaviorSubject<IUser | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  baseURL = environment.baseUrl;

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http
      .post<IUser>(`${this.baseURL}/ApplicationUser/login`, {
        email: email,
        password: password,
      })
      .pipe(
        map((response: IUser) => {
          const user = response;
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            this.currentUserSource.next(user);
          }
        })
      );
  }

  setCurrentUser(user: IUser) {
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
