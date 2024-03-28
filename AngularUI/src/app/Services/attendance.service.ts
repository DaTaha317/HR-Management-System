import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAttendence } from '../interfaces/IAttendence';
import { PaginationResult } from '../interfaces/IPagination';
import { UserParams } from '../models/UserParams';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  userParams: UserParams | undefined;
  baseUrl = environment.baseUrl;
  paginatedResult: PaginationResult<IAttendence[]> = new PaginationResult<IAttendence[]>;
  constructor(private http: HttpClient) {
    this.userParams = new UserParams();
  }

  addAttendance(attendance: IAttendence): Observable<IAttendence> {
    return this.http.post<IAttendence>(
      `${this.baseUrl}/Attendence`,
      attendance
    );
  }

  // these params are optional because we have default values
  getAll(userParams: UserParams) {

    let params = new HttpParams();

    // append to http params
    if (userParams.pageNumber && userParams.pageSize) {
      params = params.append("pageSize", userParams.pageSize);
      params = params.append("pageNumber", userParams.pageNumber);
      params = params.append("startDate", userParams.startDate);
      params = params.append("endDate", userParams.endDate);
      if (userParams.queryString != "") {
        params = params.append("stringQuery", userParams.queryString);
      }
    }

    return this.http.get<IAttendence[]>(`${this.baseUrl}/Attendence`, { observe: 'response', params }).pipe(
      map((response) => {

        if (response.body) {
          this.paginatedResult.result = response.body;
        }

        const pagination = response.headers.get('Pagination');

        if (pagination) {
          this.paginatedResult.pagination = JSON.parse(pagination);
        }

        return this.paginatedResult;

      })
    );
  }

  deleteRecord(id: number, date: Date): Observable<IAttendence> {
    return this.http.delete<IAttendence>(`${this.baseUrl}/attendence/${id}?date=${date}`);
  }

  updateRecord(id: number, record: IAttendence): Observable<IAttendence> {
    return this.http.put<IAttendence>(
      `${this.baseUrl}/attendence/${id}`,
      record
    );
  }

  ResetUserParams() {
    this.userParams = new UserParams();
  }

}
