import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../helpers/userInterface.type';

@Component({
  selector: 'login',
  styleUrls: ['./login.component.css'],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = 'Usuario o contraseña incorrectos';
  roles: string[] = [];
  router: Router;
  user: User;

  constructor(
    private authService: AuthService,
    router: Router) 
  {
    this.router = router;
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.authService.login(this.form).subscribe(
      data => {
        this.user = data;
        this.authService.setUser(this.user);
        this.authService.setLoggedIn(true);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        localStorage.setItem('logged', 'true');
        localStorage.setItem('user', JSON.stringify(this.user));
        this.reloadPage();
      },
      err => {
        console.log(err);
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    this.router.navigateByUrl('/principal');
  }

}