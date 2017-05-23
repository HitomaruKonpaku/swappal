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
import { AlertService, AuthenticationService, APIService, ValidationService } from './_services/index';
import { Skill} from './_models/index';
import { HeaderComponent, FooterComponent,ExchangeDialog } from './_layouts/index';
import {RatingModule} from 'ngx-rating';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { LogoutComponent } from './logout/index';
import { RegisterComponent,VerificationComponent } from './register/index';
import { ProfileComponent } from './profile/index';
import { SearchComponent} from './search/index';
import { ContactUsComponent, AboutUsComponent, FAQsComponent} from './foundation/index';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { News1Component,News2Component,News3Component,News4Component } from './news/index';

let providers = {
    "google": {
      "clientId": "864996270173-anbttqjuc2e7p08itjg77tfeb7eliifs.apps.googleusercontent.com"
    },
    "facebook": {
      "clientId": "206599836481870",
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
    RatingModule,
    Ng2AutoCompleteModule,
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
    ExchangeDialog,
    News1Component,
    News2Component,
    News3Component,
    News4Component,
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    ValidationService,
    APIService,
    Skill,
    SearchComponent,
    HeaderComponent,
    
  ],
  entryComponents: [
    ExchangeDialog
  ],
  bootstrap: [
    AppComponent
  ]

})

export class AppModule { }
