import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IApplicationUser } from 'src/app/interfaces/IApplicationUser';
import { IRegister } from 'src/app/interfaces/IRegister';
import { IRole } from 'src/app/interfaces/IRole';
import { RolesService } from 'src/app/services/roles.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-new-admin',
  templateUrl: './new-admin.component.html',
  styleUrls: ['./new-admin.component.css'],
})
export class NewAdminComponent implements OnInit {
  validationAdmin!: FormGroup;
  roles!: IRole[];
  user: IRegister = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    roleName: '',
  };
  constructor(
    private formbuilder: FormBuilder,
    private toastr: ToastrService,
    private roleService: RolesService,
    private userService: UserService
  ) {}
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

    this.validationAdmin = this.formbuilder.group(
      {
        fullname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(4)]],
        confirmedPassword: ['', Validators.required],
        role: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }
  passwordMatchValidator(group: FormGroup) {
    const passwordControl = group.get('password');
    const confirmedPasswordControl = group.get('confirmedPassword');

    if (passwordControl?.value !== confirmedPasswordControl?.value) {
      confirmedPasswordControl?.setErrors({ passwordMismatch: true });
    } else {
      confirmedPasswordControl?.setErrors(null);
    }
  }
  sucsess() {
    if (!this.validationAdmin.valid) {
      return;
    }
    console.log(this.user);
    this.userService.addUser(this.user).subscribe(() => {
      this.toastr.success('User added Succesfully');
      // this.reset();
      // this.validationAdmin.reset();
    });
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
