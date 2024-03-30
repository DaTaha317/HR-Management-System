import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IDepartment } from 'src/app/interfaces/IDepartment';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {

  model: any = {};
  isSubmitted = false;

  departments: IDepartment[] | undefined;

  signInForm: FormGroup = new FormGroup({});

  formError: boolean = false;
  fillForm: boolean = false;

  constructor(private accountService: AccountService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.signInForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]), // array of validators
    });

  }

  login() {
    this.isSubmitted = true;
    let email = this.signInForm.value['email'];
    let password = this.signInForm.value['password'];
    if (!this.email?.valid || !this.password?.valid) {
      return;
    }
    this.accountService.login(email, password).subscribe({
      next: () => {
        this.toastr.success("logged in successfully");
        this.router.navigate(['/home']);
      },
      error: () => {
        this.formError = true;
      },
    });
  }

  get email() {
    return this.signInForm.get("email")
  }

  get password() {
    return this.signInForm.get("password")
  }

}
