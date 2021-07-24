import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../helpers/userInterface.type';
import { Team } from '../helpers/teamInterface.type';
import { Petition } from '../helpers/petitionInterface.type';
import { PetitionUpdateDTO } from 'src/helpers/petitionUpdateInterface.type';


const USER_API = 'http://localhost:8080/petition';

@Injectable({
  providedIn: 'root'
})
export class PetitionService {

  constructor(private http: HttpClient) { }

  getOwnPetitions(credentials): Observable<Petition[]> {

    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(credentials.username + ':' + credentials.password)
      }),
    };

    return this.http.get<Petition[]>(USER_API + "/owner/" + credentials.username, httpOptions);
  }

  getReceiverPetitions(credentials): Observable<Petition[]> {

    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(credentials.username + ':' + credentials.password)
      }),
    };

    return this.http.get<Petition[]>(USER_API + "/receiver/" + credentials.username, httpOptions);
  }


  putUpdate(credentials, petitionUpdateDTO: PetitionUpdateDTO): Observable<Petition[]> {

    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(credentials.username + ':' + credentials.password)
      }),
    };

    const body = petitionUpdateDTO;

    return this.http.put<any>(USER_API, body, httpOptions);;

  }

}