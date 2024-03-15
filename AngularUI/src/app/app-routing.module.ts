import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { OfficalDaysComponent } from './components/offical-days/offical-days.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: SignInComponent },
  { path: 'daysoff', component: OfficalDaysComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
