import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { TeamAdd } from 'src/helpers/teamAddInterface.type';
import { User } from 'src/helpers/userInterface.type';
import { TeamService } from 'src/services/team.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {

  nameUser: string;
  loggedUser: User;
  userA: User[];
  usersToAdd: string[];
  form: any = {};

  constructor(private teamservice: TeamService, private router: Router, private userService: UserService) {
    this.usersToAdd = new Array();
  }


  ngOnInit() {
    this.loggedUser = JSON.parse(localStorage.getItem('user'));
  }

  onSubmit(): void {
    const teamAdd : TeamAdd = {
      name: this.form.name,
  
      ownerUsername: this.loggedUser.username,
      
      description: this.form.description,

      users: this.usersToAdd
    }
    this.teamservice.addTeam(this.loggedUser, teamAdd).subscribe( 
      data => {
        this.router.navigateByUrl("principal/teams");
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

}
