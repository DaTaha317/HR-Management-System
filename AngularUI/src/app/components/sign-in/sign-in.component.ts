import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IDepartment } from 'src/app/interfaces/IDepartment';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  model: any = {};

  departments: IDepartment[] | undefined;

  signInForm: FormGroup = new FormGroup({});

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.signInForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]), // array of validators
    });
  }


  login() {
    let email = this.signInForm.value['email'];
    let password = this.signInForm.value['password'];

    this.accountService.login(email, password).subscribe(
      d => {
        this.router.navigate(['/']);
      }
    )

  }




}
