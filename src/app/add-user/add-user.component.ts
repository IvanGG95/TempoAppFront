import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAdd } from 'src/helpers/userAddInterface.type';
import { User } from 'src/helpers/userInterface.type';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  router: Router;
  user: User;
  errors: string[];


  constructor(
    private userService: UserService,
    router: Router) 
  {
    this.router = router;
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const userToSave : UserAdd = {
      username: this.form.username,
  
      password: this.form.password,
      
      email: this.form.email,

      weeklyWorkHours: 40,

      availableFreeDays: 25
    }

    const admin : UserAdd = {
      username: "Admin",
  
      password: "Admin",
      
      email: this.form.email,

      weeklyWorkHours: 40,

      availableFreeDays: 25
    }


    this.userService.addUsers(admin, userToSave).subscribe(
      data => {this.router.navigateByUrl('login')
    },
    err => {
      this.isLoginFailed = true;
      this.errors = err.error;
    });
  }

}
