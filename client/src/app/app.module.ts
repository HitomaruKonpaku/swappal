import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BaseRequestOptions } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, APIService } from './_services/index';
import { Skill} from './_models/index';
import { HeaderComponent, FooterComponent } from './_layouts/index';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { LogoutComponent } from './logout/index';
import { RegisterComponent ,VerificationComponent} from './register/index';
import { ProfileComponent } from './profile/index';
import { SearchComponent} from './search/index';
import { ContactUsComponent, AboutUsComponent, FAQsComponent} from './foundation/index';


// import {RequestDialogComponent} from './profile/index';
// import {CreateProfileDialogComponent} from './login/index';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    MaterialModule,
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
    // RequestDialogComponent,
    // CreateProfileDialogComponent,

  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    APIService,
    Skill,
    SearchComponent,
  ],
  // entryComponents:[CreateProfileDialogComponent],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }
