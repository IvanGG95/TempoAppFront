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
  userA: User[];
  usersToAdd: string[];
  form: any = {};
  private readonly onDestroy = new Subject<void>();
  teams: Team[];
  selectControl = new FormControl();

  constructor(private reunionService: ReunionService, private teamService: TeamService, private router: Router, private userService: UserService) {
    this.usersToAdd = new Array();
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
    
    const teamAdd : ReunionAdd = {
      date: this.form.date,
      creator: this.loggedUser.username,
      description: this.form.description,
      users: this.usersToAdd,
      teamId: this.form.team
    }
    console.log(this.form);
    console.log(this.selectControl.get);
   
    this.reunionService.addReunion(this.loggedUser, teamAdd).subscribe( 
      data => {
        this.router.navigateByUrl("principal/reunion");
      }
    );  
  }

  onSearchSubmit(): void{
    this.userService.getUsers(this.loggedUser, this.form.nameUser).subscribe(
      data => {
      this.userA = data});
  }

  addUser(user){
    this.userA = this.userA.filter(obj => obj !== user);
    this.usersToAdd.push(user.username);

  }

  ngOnDestroy(){
    this.onDestroy.next();
  }

}
