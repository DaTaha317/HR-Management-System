import { Component, OnInit } from '@angular/core';
import { IRole } from 'src/app/interfaces/IRole';
import { RolesService } from 'src/app/services/roles.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  allUserRoles: IRole[] | undefined;

  constructor(private rolesServices: RolesService) {
  }

  ngOnInit(): void {
    this.getAllRoles();
  }

  getAllRoles() {
    this.rolesServices.getAllRoles().subscribe({
      next: (roles: IRole[]) => {
        this.allUserRoles = roles;
        console.log(roles);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }



}
