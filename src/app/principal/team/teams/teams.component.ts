import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription, timer } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Team } from '../../../../helpers/teamInterface.type';
import { User } from '../../../../helpers/userInterface.type';
import { TeamService } from '../../../../services/team.service';


@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit, OnDestroy {

  private readonly onDestroy = new Subject<void>();
  
  teams: Team[];

  loggedUser: User;

  constructor(private teamService: TeamService) { 
    this.teams = new Array;
  }

  ngOnInit() {
    console.log("Primer console "+this.teams);
    this.loggedUser = JSON.parse(localStorage.getItem('user'));
    this.teamService.getTeams(this.loggedUser).pipe(takeUntil(this.onDestroy)).subscribe(
      data => {
        this.teams = data; 
      }
      );
  }

  ngOnDestroy(){
    this.onDestroy.next();
  }


deleteTeam(team){
  let deleted;
  this.teamService.deleteTeam(this.loggedUser,team.teamId).pipe(takeUntil(this.onDestroy)).subscribe(
    data => {
      deleted = data;
      if(deleted == true){
        this.teams = this.teams.filter(obj => obj !== team);
      }
    }
  );
}
  
}
