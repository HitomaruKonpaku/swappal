import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BaseRequestOptions } from '@angular/http';
import { MaterialModule } from '@angular/material';
import {MdAutocompleteModule} from '@angular/material';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { Angular2SocialLoginModule } from "angular2-social-login";
import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, APIService } from './_services/index';
import { Skill} from './_models/index';
import { HeaderComponent, FooterComponent } from './_layouts/index';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { LogoutComponent } from './logout/index';
import { RegisterComponent,VerificationComponent } from './register/index';
import { ProfileComponent } from './profile/index';
import { SearchComponent} from './search/index';
import { ContactUsComponent, AboutUsComponent, FAQsComponent} from './foundation/index';

let providers = {
    // "google": {
    //   "clientId": "GOOGLE_CLIENT_ID"
    // },
    "facebook": {
      "clientId": "1694410110862800",
      "apiVersion": "v2.9"
    }
  };
Angular2SocialLoginModule.loadProvidersScripts(providers);

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    MaterialModule,
    MdAutocompleteModule,
    ReactiveFormsModule,
    Angular2SocialLoginModule,
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    ProfileComponent,
    SearchComponent,
    ContactUsComponent,
    AboutUsComponent,
    FAQsComponent,
    VerificationComponent,
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    APIService,
    Skill,
    SearchComponent,

  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }
