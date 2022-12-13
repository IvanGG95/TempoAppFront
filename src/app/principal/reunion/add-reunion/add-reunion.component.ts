import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReunionAdd } from 'src/helpers/reunionAddInterface.type';
import { Reunion } from 'src/helpers/reunionInterface.type';
import { Observable, Subject, Subscription, timer } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Team } from 'src/helpers/teamInterface.type';
import { User } from 'src/helpers/userInterface.type';
import { ReunionService } from 'src/services/reunion.service';
import { TeamService } from 'src/services/team.service';
import { UserService } from 'src/services/user.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-reunion',
  templateUrl: './add-reunion.component.html',
  styleUrls: ['./add-reunion.component.css']
})
export class AddReunionComponent implements OnInit, OnDestroy {

  nameUser: string;
  loggedUser: User;
  users: User[];
  usersToAdd: User[];
  form: any = {};
  private readonly onDestroy = new Subject<void>();
  teams: Team[];
  teamSelected;
  selectControl = new FormControl();
  error: string;
  minDate = new Date().toISOString().substring(0,16);

  constructor(private reunionService: ReunionService, private teamService: TeamService, private router: Router, private userService: UserService) {
    this.usersToAdd = new Array();
    console.log(this.minDate)
  }


  ngOnInit() {
    this.loggedUser = JSON.parse(localStorage.getItem('user'));
    this.teamService.getTeams(this.loggedUser).pipe(takeUntil(this.onDestroy)).subscribe(
      data => {
        this.teams = data; 
      }
      );
  }

  onSubmit(): void {
    var usersString:string[] = new Array;
    this.usersToAdd.forEach(u => {usersString.push(u.username)})
    const teamAdd : ReunionAdd = {
      date: new Date(this.form.date),
      creator: this.loggedUser.username,
      description: this.form.description,
      users: usersString,
      teamId: this.form.team
    }
    console.log(this.form);
    console.log(this.selectControl.get);
   
    this.reunionService.addReunion(this.loggedUser, teamAdd).subscribe( 
      data => {
        this.router.navigateByUrl("principal/reunion");
      },
      error =>{
        this.error = error.error;
      }
    );  
  }

  addUser(user){
    this.users = this.users.filter(obj => obj !== user);
    this.usersToAdd.push(user);
  }

  ngOnDestroy(){
    this.onDestroy.next();
  }

  deleteInvited(user){
    this.usersToAdd = this.usersToAdd.filter(obj => obj !== user);
    this.users.push(user);
  }

  onTeamSelected(team){
    console.log(team)
    this.teamSelected = team;
    this.userService.getUsersByTeam(this.loggedUser, team).subscribe(data => {
      this.users = data;
      this.usersToAdd = [];
    });
  }

}
