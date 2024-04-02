// Importing Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';

// Importing Components
import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { LandingComponent } from './components/landing/landing.component';

import { NewAdminComponent } from './components/new-admin/new-admin.component';
import { AttendanceReportComponent } from './components/attendance-report/attendance-report.component';
import { SalaryReportComponent } from './components/salary-report/salary-report.component';
import { OfficalDaysComponent } from './components/offical-days/offical-days.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { DisplayEmployeeComponent } from './components/display-employee/display-employee.component';
import { UpdateEmployeeComponent } from './components/update-employee/update-employee.component';
import { OrganizationSettingsComponent } from './components/organization-settings/organization-settings.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FilterPipe } from './pipes/filter.pipe';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { AddAttendanceComponent } from './components/add-attendance/add-attendance.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptorInterceptor } from './_interceptors/loading-interceptor.interceptor';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { RolesComponent } from './components/roles/roles.component';
import { UpdateRoleComponent } from './components/update-role/update-role.component';
import { AddRoleComponent } from './components/add-role/add-role.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { UsersComponent } from './components/users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    LandingComponent,
    NewAdminComponent,
    AttendanceReportComponent,
    SalaryReportComponent,
    OfficalDaysComponent,
    AddEmployeeComponent,
    DisplayEmployeeComponent,
    UpdateEmployeeComponent,
    OrganizationSettingsComponent,
    FilterPipe,
    AddAttendanceComponent,
    RolesComponent,
    UpdateRoleComponent,
    AddRoleComponent,
    SidebarComponent,
    UsersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000, // Toast disappears after 3 seconds
      progressBar: true,
      positionClass: 'toast-bottom-right',
    }),
    NgxSpinnerModule.forRoot({
      type: 'line-scale-party',
    }),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptorInterceptor,
      multi: true,
    },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
