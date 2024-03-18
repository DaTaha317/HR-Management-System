import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class preventLoginGuard implements CanActivate {

  constructor(private accountService: AccountService, private toastr: ToastrService, private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.accountService.currentUser$.pipe(
      map((user) => {
        if (!user) return true;
        else {
          this.toastr.error("You are already logged in");
          this.router.navigate(['/home']);
          return false;
        };
      })
    )
  }

};
