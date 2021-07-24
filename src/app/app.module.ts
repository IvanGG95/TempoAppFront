import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {LoginComponent} from './login/login.component';
import { AppComponent } from './app.component';
import { PrincipalComponent } from './principal/principal.component';
import { WorkersComponent } from './principal/workers/workers.component';
import { CalendarComponent } from './principal/calendar/calendar.component';
import { TeamsComponent } from './principal/teams/teams.component';
import { InteractionsComponent } from './principal/interactions/interactions.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PrincipalComponent,
    WorkersComponent,
    CalendarComponent,
    TeamsComponent,
    InteractionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
