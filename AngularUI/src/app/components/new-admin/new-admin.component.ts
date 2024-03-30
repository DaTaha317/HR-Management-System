import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IRole } from 'src/app/interfaces/IRole';
import { RolesService } from 'src/app/services/roles.service';

@Component({
  selector: 'app-new-admin',
  templateUrl: './new-admin.component.html',
  styleUrls: ['./new-admin.component.css'],
})
export class NewAdminComponent implements OnInit {
  validationAdmin: FormGroup;
  roles!: IRole[];
  constructor(
    private formbuilder: FormBuilder,
    private toastr: ToastrService,
    private roleService: RolesService
  ) {
    this.validationAdmin = formbuilder.group({
      fullname: ['', Validators.required],

      username: ['', Validators.required],

      email: ['', Validators.required],

      password: ['', [Validators.required]],

      role: ['', Validators.required],
    });
  }
  get fullname() {
    return this.validationAdmin.get('fullname');
  }
  get email() {
    return this.validationAdmin.get('email');
  }
  get username() {
    return this.validationAdmin.get('username');
  }
  get password() {
    return this.validationAdmin.get('password');
  }
  get role() {
    return this.validationAdmin.get('role');
  }

  ngOnInit() {
    this.getAllRoles();
  }
  sucsess() {
    this.toastr.success('An new admin has been added');
    this.reset();
    this.validationAdmin.reset();
  }
  reset() {
    // all form inputs must be reset here
  }

  getAllRoles() {
    this.roleService.getAllRoles().subscribe((data: IRole[]) => {
      this.roles = data;
    });
  }
}
