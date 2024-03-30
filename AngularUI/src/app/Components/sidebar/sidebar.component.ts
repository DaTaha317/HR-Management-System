import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit() {}

  logout() {
    this.accountService.logout();
    this.routeToLogin();
  }

  routeToLogin() {
    this.router.navigate(['/']);
  }

  toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const closeBtn = document.querySelector('#btn') as HTMLElement;

    if (sidebar && sidebar.classList) {
      sidebar.classList.toggle('open');
      this.menuBtnChange(closeBtn);
    }
  }

  menuBtnChange(closeBtn: HTMLElement): void {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar && closeBtn) {
      if (sidebar.classList.contains('open')) {
        closeBtn.classList.replace('bx-menu', 'bx-menu-alt-right');
      } else {
        closeBtn.classList.replace('bx-menu-alt-right', 'bx-menu');
      }
    }
  }

  closeSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const closeBtn = document.querySelector('#btn') as HTMLElement;

    if (sidebar && sidebar.classList.contains('open')) {
      sidebar.classList.remove('open');
      this.menuBtnChange(closeBtn);
    }
  }
}
