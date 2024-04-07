import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IRole, IRoleName } from 'src/app/interfaces/IRole';
import { IRolePermission } from 'src/app/interfaces/IRolePermission';
import { RolesService } from 'src/app/services/roles.service';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css'],
})
export class AddRoleComponent implements OnInit {
  allPermissions: IRolePermission;
  constructor(
    private roleService: RolesService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.allPermissions = {
      roleId: '',
      roleName: '',
      roleClaims: [
        {
          displayValue: 'Permissions.Employees.View',
          isSelected: false,
        },
        {
          displayValue: 'Permissions.Employees.Create',
          isSelected: false,
        },
        {
          displayValue: 'Permissions.Employees.Edit',
          isSelected: false,
        },
        {
          displayValue: 'Permissions.Employees.Delete',
          isSelected: false,
        },
        {
          displayValue: 'Permissions.Settings.View',
          isSelected: false,
        },
        {
          displayValue: 'Permissions.Settings.Create',
          isSelected: false,
        },
        {
          displayValue: 'Permissions.Settings.Edit',
          isSelected: false,
        },
        {
          displayValue: 'Permissions.Settings.Delete',
          isSelected: false,
        },
        {
          displayValue: 'Permissions.Attendance.View',
          isSelected: false,
        },
        {
          displayValue: 'Permissions.Attendance.Create',
          isSelected: false,
        },
        {
          displayValue: 'Permissions.Attendance.Edit',
          isSelected: false,
        },
        {
          displayValue: 'Permissions.Attendance.Delete',
          isSelected: false,
        },
        {
          displayValue: 'Permissions.Salary.View',
          isSelected: false,
        },
        {
          displayValue: 'Permissions.Salary.Create',
          isSelected: false,
        },
        {
          displayValue: 'Permissions.Salary.Edit',
          isSelected: false,
        },
        {
          displayValue: 'Permissions.Salary.Delete',
          isSelected: false,
        },
      ],
    };
  }

  ngOnInit() {}

  addRole(roleName: string) {
    let role = {} as IRoleName;
    role.name = roleName;
    this.roleService.addRole(role).subscribe((data: IRole) => {
      this.allPermissions.roleId = data.id;
      this.roleService.updateRolePermission(this.allPermissions).subscribe(
        (data) => {},
        (error) => {}
      );
      this.router.navigateByUrl('/roles');
    });
  }
}
