import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../helpers/userInterface.type';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.css']
})
export class WorkersComponent implements OnInit {

  users: User[];
  loggedUser: User;
  constructor(private userService: UserService) { }
  
  ngOnInit() {
    this.loggedUser = JSON.parse(localStorage.getItem('user'));
    this.userService.getWorkers(this.loggedUser).subscribe(
      data => {this.users = data});
      console.log(this.users)
  }


}
