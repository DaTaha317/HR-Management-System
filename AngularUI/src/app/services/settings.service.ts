import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IOrganizationSettings } from '../interfaces/IOrganizationSettings';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private apiURL = environment.baseUrl;

  constructor(private http: HttpClient) {}

  GetOrganization(): Observable<any> {
    let data = this.http.get<IOrganizationSettings>(
      `${this.apiURL}/Organization`
    );
    return data;
  }

  UpdateOrganization(settings: IOrganizationSettings): Observable<any> {
    return this.http.post(`${this.apiURL}/Organization`, settings);
  }
}
