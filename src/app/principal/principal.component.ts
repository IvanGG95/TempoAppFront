import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

import { User } from '../../helpers/userInterface.type';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  router: Router;
  user: User;

  constructor(
    private authService: AuthService, 
    private userService: UserService,
    router: Router) {
    this.router = router;
  }

  ngOnInit() {
    if(localStorage.getItem('logged') == 'true'){
      this.router.navigateByUrl('/principal');
      this.user = JSON.parse(localStorage.getItem('user'));
      console.log(this.user);
    }else{
      this.router.navigateByUrl('/login');
    }
  }

  public logOut(){
    localStorage.clear();
    console.log('loguot');
    this.router.navigateByUrl('/login');
  }

  public goToCalendar(){
    this.router.navigate(['/principal/calendar'])
  }
}
