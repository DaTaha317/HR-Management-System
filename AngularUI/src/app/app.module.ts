// Importing Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

// Importing Components
import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LandingComponent } from './components/landing/landing.component';
import { NewAdminComponent } from './components/new-admin/new-admin.component';
import { AttendanceReportComponent } from './components/attendance-report/attendance-report.component';
import { SalaryReportComponent } from './components/salary-report/salary-report.component';
import { OfficalDaysComponent } from './components/offical-days/offical-days.component';
import { NgxPaginationModule } from 'ngx-pagination';

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
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
