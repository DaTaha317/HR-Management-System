import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { NewAdminComponent } from './components/new-admin/new-admin.component';
import { AttendanceReportComponent } from './components/attendance-report/attendance-report.component';
import { SalaryReportComponent } from './components/salary-report/salary-report.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: SignInComponent },
  { path: 'admin/add', component: NewAdminComponent },
  { path: 'attendance/report', component: AttendanceReportComponent },
  { path: 'salary/report', component: SalaryReportComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
