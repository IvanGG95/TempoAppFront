import { Component, OnInit } from '@angular/core';
import { User } from 'src/helpers/userInterface.type';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.css']
})
export class SearchUsersComponent implements OnInit {
  
  userA: User[];

  form: any = {};

  usersToAdd: string[];
  
  loggedUser;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(localStorage.getItem('user'));
  }

  onSearchSubmit(): void{
    console.log(this.form.nameUser);
    this.userService.getUsers(this.loggedUser, null).subscribe(
      data => {
      this.userA = data});
  }
  
  addUser(user){
  this.userA = this.userA.filter(obj => obj !== user);
  this.usersToAdd.push(user.username);
  
  }


}
