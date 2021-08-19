import { Component, OnDestroy, OnInit } from '@angular/core';
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

    search: boolean;

    currentReunion: number;

    userA: User[];

    form: any = {};

    usersToAdd: string[];
  
    constructor(private reunionService: ReunionService, private userService :UserService) { 
      this.reunions = new Array;
      this.search = false;
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
  
    ngOnDestroy(){
      this.onDestroy.next();
    }

    addAssistants(reunionId){
      this.search= true;
      this.currentReunion = reunionId;
    }
  
  
  deleteReunion(reunion){
    let deleted;
    this.reunionService.deleteReunion(this.loggedUser,reunion.reunionId).pipe(takeUntil(this.onDestroy)).subscribe(
      data => {
        deleted = data;
        if(deleted == true){
          this.reunions = this.reunions.filter(obj => obj !== reunion);
        }
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

addAssistantsBd(reunion){
  this.reunionService.addAssistants(this.loggedUser,reunion.reunionId,this.usersToAdd).subscribe(data =>{
    let reunionData: Reunion = data;
    console.log(reunionData);
    if(this.currentReunion == reunionData.reunionId){
      reunion = reunionData ;
    }

    this.currentReunion = null;
    this.usersToAdd = new Array();
    this.search = false;

  });
}

}
