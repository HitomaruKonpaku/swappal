import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing } from './app.routing';
import { HeaderComponent } from './_layouts/index';
import { HomeComponent } from './home/index';
import { UserComponent } from './user/index';
import { SkillComponent } from './skill/index';
import { ReportComponent } from './report/index';
import { LoginComponent } from './login/index';
import { FeedbackComponent } from './feedback/index';
import { NewsComponent } from './news/index';
import { ChartModule } from 'angular2-chartjs';
import {MaterialModule} from '@angular/material';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdButtonModule, MdCheckboxModule} from '@angular/material';
// import 'hammerjs';

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
   ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
