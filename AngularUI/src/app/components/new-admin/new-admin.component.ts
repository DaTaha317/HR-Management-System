import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IRole } from 'src/app/interfaces/IRole';
import { RolesService } from 'src/app/services/roles.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-new-admin',
  templateUrl: './new-admin.component.html',
  styleUrls: ['./new-admin.component.css'],
})
export class NewAdminComponent implements OnInit {
  validationAdmin: FormGroup;
  roles!: IRole[];
  user = {};
  constructor(
    private formbuilder: FormBuilder,
    private toastr: ToastrService,
    private roleService: RolesService,
    private userService: UserService
  ) {
    this.validationAdmin = formbuilder.group({
      fullname: ['', Validators.required],

      email: ['', Validators.required],

      password: ['', [Validators.required]],
      confirmedPassword: ['', [Validators.required]],

      role: ['', Validators.required],
    });
  }
  get fullname() {
    return this.validationAdmin.get('fullname');
  }
  get email() {
    return this.validationAdmin.get('email');
  }

  get password() {
    return this.validationAdmin.get('password');
  }

  get confirmedPassword() {
    return this.validationAdmin.get('confirmedPassword');
  }
  get role() {
    return this.validationAdmin.get('role');
  }

  ngOnInit() {
    this.getAllRoles();
  }
  sucsess() {
    this.toastr.success('User added Succesfully');
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

  onSubmit() {
    if (!this.validationAdmin.valid) {
      return;
    }
    this.userService.addUser(this.user).subscribe((data) => {});
  }
}
