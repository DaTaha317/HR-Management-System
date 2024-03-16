import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { OrganizationSettingsComponent } from './components/organization-settings/organization-settings.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: SignInComponent },
  {path: 'settings', component: OrganizationSettingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
