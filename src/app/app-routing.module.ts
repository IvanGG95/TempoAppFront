import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {PrincipalComponent} from './principal/principal.component';
import {WorkersComponent} from './principal/workers/workers.component';
import { CalendarComponent } from './principal/calendar/calendar.component';
import { TeamsComponent } from './principal/team/teams/teams.component';
import { InteractionsComponent } from './principal/interactions/interactions.component';
import { AddTeamComponent } from './principal/team/add-team/add-team.component';
import { ReunionComponent } from './principal/reunion/reunions/reunion.component';
import { VacationsComponent } from './principal/vacations/vacations.component';
import { AddReunionComponent } from './principal/reunion/add-reunion/add-reunion.component';
import { AddUserComponent } from './add-user/add-user.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'adduser', component: AddUserComponent},
  { path: 'principal', component: PrincipalComponent, children:[
    { path: '', component: CalendarComponent},
    { path: 'workers', component: WorkersComponent},
    { path: 'calendar', component: CalendarComponent},
    { path: 'teams', component: TeamsComponent},
    { path: 'teamsAdd', component: AddTeamComponent},
    { path: 'interactions', component: InteractionsComponent},
    { path: 'reunion', component: ReunionComponent},
    { path: 'reunionAdd', component: AddReunionComponent},
    { path: 'vacations', component: VacationsComponent}
  ]},
  { path: '', redirectTo: 'principal', pathMatch: 'full' }
];

@NgModule({
  imports: [CommonModule,RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})

export class AppRoutingModule { }
