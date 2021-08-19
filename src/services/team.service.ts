import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../helpers/userInterface.type';
import { Team } from '../helpers/teamInterface.type';
import { TeamAdd } from 'src/helpers/teamAddInterface.type';

const USER_API = 'http://localhost:8080/team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) { }

  getTeams(credentials): Observable<Team[]> {

    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(credentials.username + ':' + credentials.password)
      }),
    };

    return this.http.get<Team[]>(USER_API +"/"+ credentials.username, httpOptions);
  }

  addTeam(credentials, team : TeamAdd): Observable<Team> {

    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(credentials.username + ':' + credentials.password)
      }),
    };

    return this.http.post<Team>(USER_API, team, httpOptions);
  }

  deleteTeam(credentials, id): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(credentials.username + ':' + credentials.password)
      }),
    };

    return this.http.delete<Team>(USER_API+"/"+id, httpOptions);
  }
}