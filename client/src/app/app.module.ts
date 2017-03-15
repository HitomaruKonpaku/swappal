import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BaseRequestOptions } from '@angular/http';


import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService, APIService } from './_services/index';

import { HeaderComponent, FooterComponent, BackgroundComponent } from './_layouts/index';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { LogoutComponent } from './logout/index';
import { RegisterComponent } from './register/index';
import { ProfileComponent } from './profile/index';
import { Tabs } from './profile/index';
import { Tab } from './profile/index';
import {DialogOverviewExampleDialog} from './profile/request.component';



@NgModule({
  imports: [
    MaterialModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
  ],
  declarations: [

    DialogOverviewExampleDialog,
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BackgroundComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    ProfileComponent,
    Tabs,
    Tab,
],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    APIService,
  ],
  entryComponents:[DialogOverviewExampleDialog],
  bootstrap: [
    AppComponent,


  ]
})

export class AppModule { }
