import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IRole } from 'src/app/interfaces/IRole';
import { IRolePermission } from 'src/app/interfaces/IRolePermission';
import { RolesService } from 'src/app/services/roles.service';

@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.css'],
})
export class UpdateRoleComponent implements OnInit {
  allUserRoles: IRole[] | undefined;

  pagesList: string[] = ['Employee', 'Settings', 'Attendance', 'Salary'];

  selectedRole: IRole | undefined;

  allPermissions!: IRolePermission;

  constructor(
    private rolesServices: RolesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const role = history.state.role;
    if (role) {
      this.selectedRole = role;
      this.getRolePermission(this.selectedRole!.id);
    }
  }

  getRolePermission(roleID: string) {
    this.rolesServices.getRolePermission(roleID).subscribe({
      next: (d: IRolePermission) => {
        this.allPermissions = d;
        console.log(d);
      },
      error: () => {},
    });
  }

  updateRolePermission() {
    this.rolesServices.updateRolePermission(this.allPermissions).subscribe({
      next: (d) => {
        this.router.navigateByUrl('/roles');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
