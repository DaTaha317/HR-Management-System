import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { IRole } from 'src/app/interfaces/IRole';
import { RolesService } from 'src/app/services/roles.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
})
export class RolesComponent implements OnInit {
  allUserRoles!: IRole[];
  modalRef?: BsModalRef;
  toDeleteRole = '';

  constructor(
    private rolesServices: RolesService,
    private router: Router,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.getAllRoles();
  }

  getAllRoles() {
    this.rolesServices.getAllRoles().subscribe({
      next: (roles: IRole[]) => {
        this.allUserRoles = roles;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  updateRole(role: IRole | undefined) {
    this.router.navigate(['roles/update'], { state: { role } });
  }

  addRole() {
    this.router.navigate(['roles/add']);
  }

  deleteRole(roleName: string) {
    this.modalRef?.hide();

    this.rolesServices.deleteRoleByName(roleName).subscribe(() => {
      this.allUserRoles = this.allUserRoles.filter(
        (role) => role.name !== roleName
      );
    });
    this.getAllRoles();
  }

  decline(): void {
    this.modalRef?.hide();
  }
  openModal(template: TemplateRef<void>, role: string) {
    this.toDeleteRole = role;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
}
