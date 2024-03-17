import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(public accountService: AccountService, private router: Router) {}

  logout() {
    this.accountService.logout();
    this.routeToLogin();
  }

  routeToLogin() {
    this.router.navigate(['/']);
  }
}
