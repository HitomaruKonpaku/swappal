import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing } from './app.routing';
import { HttpModule } from '@angular/http';
import { BaseRequestOptions } from '@angular/http';
import { HeaderComponent } from './_layouts/index';
import { HomeComponent } from './home/index';
import { AlertComponent } from './_directives/index';
import { UserComponent, UserDialog } from './user/index';
import { SkillComponent, SkillDialog } from './skill/index';
import { ReportComponent } from './report/index';
import { LoginComponent } from './login/index';
import { FeedbackComponent } from './feedback/index';
import { NewsComponent } from './news/index';
import { ChartModule } from 'angular2-chartjs';
import {MaterialModule} from '@angular/material';
import {AlertService, APIService} from './_services/index';


import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdButtonModule, MdCheckboxModule} from '@angular/material';


import { AppComponent }  from './app.component';

@NgModule({
  imports:      [
    BrowserModule,
    BrowserAnimationsModule,
    ChartModule,
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
   ],
   providers:[
     AlertService,
     APIService,
   ],
   entryComponents: [
    SkillDialog,
    UserDialog
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
