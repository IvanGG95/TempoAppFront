import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Reunion } from 'src/helpers/reunionInterface.type';
import { User } from 'src/helpers/userInterface.type';
import { ReunionService } from 'src/services/reunion.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-reunion',
  templateUrl: './reunion.component.html',
  styleUrls: ['./reunion.component.css']
})
export class ReunionComponent implements OnInit, OnDestroy {

  private readonly onDestroy = new Subject<void>();

  reunions: Reunion[];

  loggedUser: User;

  currentReunion: Reunion;

  reunion: Reunion;

  searchText;

  usersToAdd: string[];

  closeResult = '';

  allUsers: string[];

  constructor(private reunionService: ReunionService, private userService: UserService, private modalService: NgbModal,) {
    this.reunions = new Array;
    this.currentReunion = null
    this.usersToAdd = new Array();
  }

  ngOnInit() {

    this.loggedUser = JSON.parse(localStorage.getItem('user'));
    this.reunionService.getReunion(this.loggedUser).pipe(takeUntil(this.onDestroy)).subscribe(
      data => {
        this.reunions = data;
        console.log(this.reunions);
      }
    );
  }

  ngOnDestroy() {
    this.onDestroy.next();
  }

  deleteReunion(reunion) {
    let deleted;
    this.reunionService.deleteReunion(this.loggedUser, reunion.reunionId).pipe(takeUntil(this.onDestroy)).subscribe(
      data => {
        deleted = data;
        if (deleted == true) {
          this.reunions = this.reunions.filter(obj => obj !== reunion);
        }
      }
    );
  }

  addUser(user) {
    this.allUsers = this.allUsers.filter(obj => obj !== user);
    this.usersToAdd.push(user);

  }

  addAssistantsBd() {
    this.reunionService.addAssistants(this.loggedUser, this.reunion.reunionId, this.usersToAdd).subscribe(data => {
      this.ngOnInit();
      this.usersToAdd = new Array();
    });
  }

  open(content, reunion) {
    this.reunion = reunion;
    this.allUsers = new Array();

    this.userService.getAllUsers(this.loggedUser).pipe(takeUntil(this.onDestroy)).subscribe(
      data => {
        let employees: string[] = new Array();

        for (let user of reunion.assistant) {
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

  exitReunion(reunion) {

    console.log(this.loggedUser);
    this.reunionService.exitReunion(this.loggedUser, reunion.reunionId).pipe(takeUntil(this.onDestroy)).subscribe(
      data => {
        this.reunions = this.reunions.filter(obj => obj !== reunion);
      }
    );
  }

  deleteInvited(user) {
    this.usersToAdd = this.usersToAdd.filter(obj => obj !== user);
  }

}
