import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {PrincipalComponent} from './principal/principal.component';
import {WorkersComponent} from './principal/workers/workers.component';
import { CalendarComponent } from './principal/calendar/calendar.component';



export const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'principal', component: PrincipalComponent, children:[
    { path: '', component: CalendarComponent},
    { path: 'workers', component: WorkersComponent},
    { path: 'calendar', component: CalendarComponent}
  ]},
  { path: '', redirectTo: 'principal', pathMatch: 'full' }
];

const opt = {
  enableTracing: false
};

@NgModule({
  imports: [CommonModule,RouterModule.forRoot(routes, opt)],
  exports: [RouterModule],
  providers: []
})

export class AppRoutingModule { }
