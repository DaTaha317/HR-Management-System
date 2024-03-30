import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IRole, IRoleName } from '../interfaces/IRole';
import { IRolePermission } from '../interfaces/IRolePermission';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getAllRoles(): Observable<IRole[]> {
    return this.http.get<IRole[]>(`${this.baseUrl}/SuperAdmin/AllRoles`);
  }

  getRolePermission(roleID: string): Observable<IRolePermission> {
    return this.http.get<IRolePermission>(
      `${this.baseUrl}/SuperAdmin/AllPermessions`,
      {
        params: {
          roleId: roleID,
        },
      }
    );
  }

  updateRolePermission(role: IRolePermission) {
    return this.http.post(`${this.baseUrl}/SuperAdmin/AddPermission`, role);
  }

  deleteRoleByName(roleName: string) {
    return this.http.delete(`${this.baseUrl}/SuperAdmin/DeleteRole`, {
      params: { roleName },
    });
  }

  addRole(roleName: IRoleName): Observable<IRole> {
    return this.http.post<IRole>(
      `${this.baseUrl}/SuperAdmin/AddRole`,
      roleName
    );
  }
}
