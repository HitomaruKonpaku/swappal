import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing } from './app.routing';
import { HttpModule } from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MdAutocompleteModule} from '@angular/material';
import { BaseRequestOptions } from '@angular/http';
import { HeaderComponent } from './_layouts/index';
import { HomeComponent } from './home/index';
import { AlertComponent } from './_directives/index';
 import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { UserComponent, UserDialog } from './user/index';
import { SkillComponent, SkillDialog,CategoryComponent,CategoryDialog } from './skill/index';
import { ReportComponent } from './report/index';
import { LoginComponent } from './login/index';
import { FeedbackComponent } from './feedback/index';
import { NewsComponent } from './news/index';
import { ChartModule } from 'angular2-chartjs';
import {MaterialModule} from '@angular/material';
import {AlertService, APIService, ValidationService} from './_services/index';


import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdButtonModule, MdCheckboxModule} from '@angular/material';


import { AppComponent }  from './app.component';

@NgModule({
  imports:[
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2AutoCompleteModule,
    HttpModule,
    ChartModule,
    MdAutocompleteModule,
    routing,
    MdButtonModule,
    MdCheckboxModule,
    MaterialModule,
   ],
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    UserComponent,
    ReportComponent,
    LoginComponent,
    SkillComponent,
    FeedbackComponent,
    NewsComponent,
    SkillDialog,
    UserDialog,
    AlertComponent,
    CategoryComponent,
    CategoryDialog,
   ],
   providers:[
     AlertService,
     APIService,
     ValidationService,
   ],
   entryComponents: [
    SkillDialog,
    UserDialog,
    CategoryDialog,
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
