import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../helpers/userInterface.type';

const AUTH_API = 'http://localhost:8080/user/authentication';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn : Boolean = false;
  user: User;

  constructor(private http: HttpClient) { }

  login(credentials): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(credentials.username + ':' + credentials.password)
      }),
    };

    return this.http.get<User>(AUTH_API + '?userName=' + credentials.username, httpOptions);
  }

  setUser(user){
    this.user = user
  }

  getUser(){
   return this.user;
  }

  setLoggedIn(bol: Boolean){
    this.loggedIn = bol;
  }

  isLoggedIn(){
    return this.loggedIn;
  }

}
