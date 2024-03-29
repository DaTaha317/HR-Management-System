import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IRole } from 'src/app/interfaces/IRole';
import { IRolePermission } from 'src/app/interfaces/IRolePermission';
import { RolesService } from 'src/app/services/roles.service';


@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent implements OnInit {

  allUserRoles: IRole[] | undefined;

  pagesList: string[] = ["Employee", "Settings", "Attendance", "Salary"];

  selectedRole: IRole | undefined;

  allPermissions: IRolePermission | undefined;

  constructor(private rolesServices: RolesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const role = history.state.role;
    if (role) {
      this.selectedRole = role;
      this.getRolePermission(this.selectedRole!.id)

    }
  }

  getRolePermission(roleID: string) {
    this.rolesServices.getRolePermission(roleID).subscribe({
      next: (d: IRolePermission) => {
        this.allPermissions = d;
      },
      error: () => { }
    });
  }



}
