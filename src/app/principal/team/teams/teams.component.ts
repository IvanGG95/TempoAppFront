import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription, timer } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Team } from '../../../../helpers/teamInterface.type';
import { User } from '../../../../helpers/userInterface.type';
import { TeamService } from '../../../../services/team.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/services/user.service';


@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit, OnDestroy {

  private readonly onDestroy = new Subject<void>();

  teams: Team[];

  closeResult = '';

  loggedUser: User;

  currentTeam;

  userA: User[];

  searchUser;

  searchText;

  usersToAdd: string[];

  allUsers: string[];


  constructor(private teamService: TeamService, private modalService: NgbModal, private userService: UserService) {
    this.teams = new Array;
    this.usersToAdd = new Array;
    this.allUsers = new Array;
  }

  ngOnInit() {
    this.loggedUser = JSON.parse(localStorage.getItem('user'));
    this.teamService.getTeams(this.loggedUser).pipe(takeUntil(this.onDestroy)).subscribe(
      data => {
        console.log(data);
        this.teams = data;
      }
    );
  }

  ngOnDestroy() {
    this.onDestroy.next();
  }


  deleteTeam(team) {
    console.log(this.loggedUser);

    let deleted;
    this.teamService.deleteTeam(this.loggedUser, team.teamId).pipe(takeUntil(this.onDestroy)).subscribe(
      data => {
        deleted = data;
        if (deleted == true) {
          this.teams = this.teams.filter(obj => obj !== team);
        }
      }
    );
  }

  exitTeam(team) {
    console.log(this.loggedUser);
    this.teamService.exitTeam(this.loggedUser,this.loggedUser, team.teamId).pipe(takeUntil(this.onDestroy)).subscribe(
      data => {
        this.teams = this.teams.filter(obj => obj !== team);
      }
    );
  }

  open(content, team) {
    this.currentTeam = team;
    this.allUsers = new Array();
    this.userService.getAllUsers(this.loggedUser).pipe(takeUntil(this.onDestroy)).subscribe(
      data => {
        let employees: string[] = new Array();

        for (let user of team.employees) {
          employees.push(user.username);
        }

        for (let entry of data) {
          if (entry.username != this.loggedUser.username && !employees.includes(entry.username)) {
            this.allUsers.push(entry.username);
          }
        }
      }
    );
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  addUser(user) {
    this.allUsers = this.allUsers.filter(obj => obj !== user);
    this.usersToAdd.push(user);

  }

  addAssistantsBd() {
    this.teamService.addEmployees(this.loggedUser, this.currentTeam.teamId, this.usersToAdd).subscribe(data => {
      this.modalService.dismissAll("Done");
      this.usersToAdd = new Array();
      this.ngOnInit;
    });
  }

  deleteInvited(user) {
    this.usersToAdd = this.usersToAdd.filter(obj => obj !== user);
  }

  deleteFromTeam(username) {
    console.log(username);
    this.teamService.exitTeam(this.loggedUser, username, this.currentTeam.teamId).pipe(takeUntil(this.onDestroy)).subscribe(
      data => {
        this.modalService.dismissAll();
        this.ngOnInit();
      }
    );
  }

}
