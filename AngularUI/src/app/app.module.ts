// Importing Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { JwtInterceptor } from './_interceptor/jwt.interceptor';

// Importing Components
import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LandingComponent } from './components/landing/landing.component';

import { NewAdminComponent } from './components/new-admin/new-admin.component';
import { AttendanceReportComponent } from './components/attendance-report/attendance-report.component';
import { SalaryReportComponent } from './components/salary-report/salary-report.component';
import { OfficalDaysComponent } from './components/offical-days/offical-days.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { DisplayEmployeeComponent } from './Components/display-employee/display-employee.component';
import { UpdateEmployeeComponent } from './Components/update-employee/update-employee.component';
import { OrganizationSettingsComponent } from './components/organization-settings/organization-settings.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    NavbarComponent,
    LandingComponent,
    NewAdminComponent,
    AttendanceReportComponent,
    SalaryReportComponent,
    OfficalDaysComponent,
    AddEmployeeComponent,
    DisplayEmployeeComponent,
    UpdateEmployeeComponent,
    OrganizationSettingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
