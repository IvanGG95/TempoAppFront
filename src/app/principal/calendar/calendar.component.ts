import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';
import {Day} from '../../../helpers/dayInterface.type'
import {MonthService} from '../../../services/month.service'
import { User } from '../../../helpers/userInterface.type';
import { AssignedFreeDay } from '../../../helpers/assignedFreeDay.type';
import { UserService } from 'src/services/user.service';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  constructor(private monthService: MonthService, private userService: UserService) { }

  loadMonths = new Map();

  loggedUser: User;

  days :Day[];

  dayToSee: Day;

  actualMonth: string;
  actualYear: number;
  actualMonthNumber: number;

  calendarDate: string;
  firstCalendarDate: string

  today;

  months = new Array('Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Dicienbre')


  ngOnInit() {
    var date = new Date();
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0');
    var yyyy = date.getFullYear();
    this.today = yyyy + '-' + mm + '-' + dd;
    this.actualMonthNumber = date.getMonth() + 1
    this.calendarDate = yyyy + '-' + mm;
    this.firstCalendarDate = this.today ;
    this.actualMonth = this.months[date.getMonth()];
    this.actualYear = date.getFullYear();
    this.loggedUser = JSON.parse(localStorage.getItem('user'));

  this.monthService.getMonth(this.loggedUser,this.today ).subscribe(
      data => {this.days = data
        this.dayToSee = this.days[0]
      console.log(this.days)}
    );
  }
  onSave(date: Day){
  }

  nextMonth(numberMonth: number, numberYear: number){
    this.loadMonths.set(this.calendarDate, this.days);

    numberMonth = numberMonth + 1;

    console.log(numberMonth);
    if(numberMonth>12){
      numberYear = numberYear+1;
      numberMonth = 1;
    }
    console.log(numberMonth);

    var mm = String(numberMonth).padStart(2, '0');
    var date = numberYear + '-' + mm;

    this.calendarDate = date;
    this.actualYear = numberYear;
    this.actualMonth = this.months[numberMonth-1];
    this.actualMonthNumber = numberMonth;

    if(this.loadMonths.get(date) != null){
      this.days = this.loadMonths.get(date);
    }else{

      this.monthService.getMonth(this.loggedUser,numberYear+"-"+mm+"-01").subscribe(
        data => {this.days = data}
      );
    }


  }

  backMonth(numberMonth: number, numberYear: number){
    this.loadMonths.set(this.calendarDate, this.days);

    numberMonth = numberMonth - 1;

    if(numberMonth<1){
      numberYear = numberYear - 1;
      numberMonth = 12;
    }
    console.log(numberMonth);

    var mm = String(numberMonth).padStart(2, '0');
    var date = numberYear + '-' + mm;

    this.calendarDate = date;
    this.actualYear = numberYear;
    this.actualMonth = this.months[numberMonth-1];
    this.actualMonthNumber = numberMonth;

    if(this.loadMonths.get(date) != null){
      this.days = this.loadMonths.get(date);
    }else{

      this.monthService.getMonth(this.loggedUser,numberYear+"-"+mm+"-01").subscribe(
        data => {this.days = data});
    }


  }

  seeDay(day: Day){
    console.log(day)
    this.dayToSee = day;
  }

  isPassDay(dayDate: string){
    let date: Date = new Date(); 
    let dateDay: Date = new Date(dayDate); 
    if(date.getTime() >= dateDay.getTime()){
      if(this.isToday(dayDate)){
        return false;
      }
      return true;
    }
  
    return false;
  }
  
  
  isToday(dayDate: string){
  
    if(dayDate == this.today){
      return true;
    }
  
    return false;
  }
}




