import { Component, OnInit, DoCheck  } from '@angular/core';
import {AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  title = 'medium-angular-electron';
  router: Router;

  constructor(    private authService: AuthService,
    router: Router) {
    this.router = router;
  }
  
  ngOnInit() {}
  
}

