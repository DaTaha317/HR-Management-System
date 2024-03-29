import { Component, OnInit } from '@angular/core';
import { IRolePermission } from 'src/app/interfaces/IRolePermission';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css'],
})
export class AddRoleComponent implements OnInit {
  allPermissions: IRolePermission;
  constructor() {
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

  ngOnInit() {
    console.log(this.allPermissions);
  }

  addRole() {
    console.log(this.allPermissions);
  }
}
