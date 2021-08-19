import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reunion } from 'src/helpers/reunionInterface.type';
import { Team } from 'src/helpers/teamInterface.type';
import { ReunionAdd } from 'src/helpers/reunionAddInterface.type';

const USER_API = 'http://localhost:8080/reunion';

@Injectable({
  providedIn: 'root'
})
export class ReunionService {

  constructor(private http: HttpClient) { }

  getReunion(credentials): Observable<Reunion[]> {

    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(credentials.username + ':' + credentials.password)
      }),
    };

    return this.http.get<Reunion[]>(USER_API +"/"+ credentials.username, httpOptions);
  }

  addReunion(credentials, reunion : ReunionAdd): Observable<Reunion> {

    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(credentials.username + ':' + credentials.password)
      }),
    };

    return this.http.post<Reunion>(USER_API, reunion, httpOptions);
  }

  deleteReunion(credentials, id): Observable<Boolean>{
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(credentials.username + ':' + credentials.password)
      }),
    };

    return this.http.delete<Boolean>(USER_API+"/"+id, httpOptions);
  }

  addAssistants(credentials, id, user: string[]): Observable<Reunion>{
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(credentials.username + ':' + credentials.password)
      }),
    };

    return this.http.post<Reunion>(USER_API + "/addAssistants/" + id, user, httpOptions);
  }
}