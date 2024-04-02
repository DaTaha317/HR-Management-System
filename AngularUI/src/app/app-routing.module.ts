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
import { UpdateEmployeeComponent } from './components/update-employee/update-employee.component';
import { DisplayEmployeeComponent } from './components/display-employee/display-employee.component';
import { AddAttendanceComponent } from './components/add-attendance/add-attendance.component';
import { AuthGuard } from './_guards/auth.guard';
import { preventLoginGuard } from './_guards/prevent-login.guard';
import { RolesComponent } from './components/roles/roles.component';
import { UpdateRoleComponent } from './components/update-role/update-role.component';
import { AddRoleComponent } from './components/add-role/add-role.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    component: SignInComponent,
    canActivate: [preventLoginGuard],
  },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: LandingComponent },
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'users/add',
        component: NewAdminComponent,
        canActivate: [AuthGuard],
      },
      { path: 'attendance/report', component: AttendanceReportComponent },
      { path: 'salary/report', component: SalaryReportComponent },
      { path: 'daysoff', component: OfficalDaysComponent },
      { path: 'employee/add', component: AddEmployeeComponent },
      { path: 'settings', component: OrganizationSettingsComponent },
      { path: 'employee/update', component: UpdateEmployeeComponent },
      { path: 'employee/display', component: DisplayEmployeeComponent },
      { path: 'attendance/add', component: AddAttendanceComponent },
      { path: 'roles', component: RolesComponent },
      { path: 'roles/update', component: UpdateRoleComponent },
      { path: 'roles/add', component: AddRoleComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
