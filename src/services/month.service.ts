import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Day } from '../helpers/dayInterface.type';
import { User } from '../helpers/userInterface.type';
import { AssignedFreeDay } from 'src/helpers/assignedFreeDay.type';


const AUTH_API = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class MonthService {

  constructor(private http: HttpClient) { }

  getMonth(credentials, dateValue): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(credentials.username + ':' + credentials.password)
      }),
    };

    return this.http.post<Day[]>(AUTH_API+'month', { userName: credentials.username, date: dateValue }, httpOptions);
  }

  deleteHollidays(credentials :User, dates: AssignedFreeDay[]){
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(credentials.username + ':' + credentials.password),
      }),
      body: {dates}
    };

    return this.http.delete<any>(AUTH_API+'assignedFreeDay/listOfDays', httpOptions);
  
  }

  addHollidays(credentials :User, dates: AssignedFreeDay[]){
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(credentials.username + ':' + credentials.password)
      }),
    };

    return this.http.post<any>(AUTH_API+'assignedFreeDay/listOfDays', { dates }, httpOptions);
  
  }

}