import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../helpers/userInterface.type';


const USER_API = 'http://localhost:8080/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  addUsers(credentials, user): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(credentials.username + ':' + credentials.password)
      }),
    };

    return this.http.post<any>(USER_API, user, httpOptions);
  }
  getWorkers(credentials): Observable<User[]> {

    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(credentials.username + ':' + credentials.password)
      }),
    };

    return this.http.get<User[]>(USER_API + "/" + 'workers/?userName=' + credentials.username, httpOptions);
  }

  getUsers(credentials, name): Observable<User[]> {

    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(credentials.username + ':' + credentials.password)
      }),
    };

    return this.http.get<User[]>(USER_API + "/" + 'byName/' + name, httpOptions);
  }

  getUser(credentials, name): Observable<User> {

    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(credentials.username + ':' + credentials.password)
      }),
    };

    return this.http.get<User>(USER_API + "/" + name, httpOptions);
  }

  getAllUsers(credentials): Observable<User[]> {

    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(credentials.username + ':' + credentials.password)
      }),
    };

    return this.http.get<User[]>(USER_API + "/getAll" , httpOptions);
  }
}