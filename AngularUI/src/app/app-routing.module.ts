import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { SignInComponent } from './components/sign-in/sign-in.component';

import { OrganizationSettingsComponent } from './components/organization-settings/organization-settings.component';
 
import { NewAdminComponent } from './components/new-admin/new-admin.component';
import { AttendanceReportComponent } from './components/attendance-report/attendance-report.component';
import { SalaryReportComponent } from './components/salary-report/salary-report.component';
import { OfficalDaysComponent } from './components/offical-days/offical-days.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { UpdateEmployeeComponent } from './Components/update-employee/update-employee.component';
import {DisplayEmployeeComponent} from './Components/display-employee/display-employee.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: SignInComponent },
  { path: 'admin/add', component: NewAdminComponent },
  { path: 'attendance/report', component: AttendanceReportComponent },
  { path: 'salary/report', component: SalaryReportComponent },
  { path: 'daysoff', component: OfficalDaysComponent },
  { path: 'employee/add', component: AddEmployeeComponent },
  {path:'UpdateEmployee',component:UpdateEmployeeComponent},
  {path:'employees',component:DisplayEmployeeComponent},
   {path: 'settings', component: OrganizationSettingsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
