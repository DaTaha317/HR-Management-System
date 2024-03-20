import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAttendence } from '../interfaces/IAttendence';
import { PaginationResult } from '../interfaces/IPagination';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  baseUrl = environment.baseUrl;
  paginatedResult: PaginationResult<IAttendence[]> = new PaginationResult<IAttendence[]>;
  constructor(private http: HttpClient) { }

  addAttendance(attendance: IAttendence): Observable<IAttendence> {
    return this.http.post<IAttendence>(
      `${this.baseUrl}/Attendence`,
      attendance
    );
  }

  // these params are optional because we have default values
  getAll(page?: number, itemsPerPage?: number) {

    let params = new HttpParams();

    // append to http params
    if (page && itemsPerPage) {
      params = params.append("pageSize", itemsPerPage);
      params = params.append("pageNumber", page);
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

  deleteRecord(id: number): Observable<IAttendence> {
    return this.http.delete<IAttendence>(`${this.baseUrl}/attendence/${id}`);
  }

  updateRecord(id: number, record: IAttendence): Observable<IAttendence> {
    return this.http.put<IAttendence>(
      `${this.baseUrl}/attendence/${id}`,
      record
    );
  }
}
