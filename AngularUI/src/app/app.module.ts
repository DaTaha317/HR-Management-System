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
import { OrganizationSettingsComponent } from './components/organization-settings/organization-settings.component';

@NgModule({
  declarations: [AppComponent, SignInComponent, NavbarComponent, LandingComponent, OrganizationSettingsComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
