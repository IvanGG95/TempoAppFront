import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { from, Subscription } from 'rxjs';
import { Day } from '../../../helpers/dayInterface.type'
import { MonthService } from '../../../services/month.service'
import { User } from '../../../helpers/userInterface.type';
import { AssignedFreeDay } from '../../../helpers/assignedFreeDay.type';
import { UserService } from 'src/services/user.service';


@Component({
  selector: 'app-calendar',
  templateUrl: './vacations.component.html',
  styleUrls: ['./vacations.component.css']
})
export class VacationsComponent implements OnInit {

  constructor(private monthService: MonthService, private userService: UserService) {
   }

  loadMonths = new Map();

  loggedUser: User;

  user: User;

  days: Day[];

  susbscriber: Subscription;
  today: string;
  actualMonth: string;
  actualYear: number;
  actualMonthNumber: number;

  calendarDate: string;
  firstCalendarDate: string

  months = new Array('Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Dicienbre')

  holidaysToDelete: Day[] = new Array;
  holidaysToAdd: Day[] = new Array;

  ngOnInit() {
    var date = new Date();
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0');
    var yyyy = date.getFullYear();
    var today = yyyy + '-' + mm + '-' + dd;
    this.today= today;
    this.actualMonthNumber = date.getMonth() + 1
    this.calendarDate = yyyy + '-' + mm;
    this.firstCalendarDate = today;
    this.actualMonth = this.months[date.getMonth()];
    this.actualYear = date.getFullYear();


    this.loggedUser = JSON.parse(localStorage.getItem('user'));

    this.susbscriber = this.monthService.getMonth(this.loggedUser, today).subscribe(
      data => { this.days = data }
    );

    this.userService.getUser(this.loggedUser, this.loggedUser.username).subscribe(
      data => { this.user = data }
    )
  }

  onSave(date: Day) {
    if(!this.isPassDay(date.date) && !this.isToday(date.date)){
      if (date.free) {
        date.free = false;
        this.holidaysToAdd = this.holidaysToAdd.filter(obj => obj !== date);
        this.user.availableFreeDays = this.user.availableFreeDays + 1;
      } else {
        if ((date.holidays == false) && (date.weekEnd == false)
          && !(date.toDelete == true) && (date.taken == false) && this.user.availableFreeDays > 0) {
          date.free = true;
          this.holidaysToAdd.push(date);
          this.user.availableFreeDays = this.user.availableFreeDays - 1;
        }
      }
  
      if (date.holidays) {
        this.holidaysToDelete.push(date);
        date.holidays = false;
        date.toDelete = true;
        this.user.availableFreeDays = this.user.availableFreeDays + 1;
      } else {
        if (date.toDelete) {
          this.holidaysToDelete = this.holidaysToDelete.filter(obj => obj !== date);
          date.toDelete = false;
          date.holidays = true;
          this.user.availableFreeDays = this.user.availableFreeDays - 1;
        }
      }
    }
  }

  nextMonth(numberMonth: number, numberYear: number) {
    this.loadMonths.set(this.calendarDate, this.days);

    numberMonth = numberMonth + 1;

    console.log(numberMonth);
    if (numberMonth > 12) {
      numberYear = numberYear + 1;
      numberMonth = 1;
    }
    console.log(numberMonth);

    var mm = String(numberMonth).padStart(2, '0');
    var date = numberYear + '-' + mm;

    this.calendarDate = date;
    this.actualYear = numberYear;
    this.actualMonth = this.months[numberMonth - 1];
    this.actualMonthNumber = numberMonth;

    if (this.loadMonths.get(date) != null) {
      this.days = this.loadMonths.get(date);
    } else {
      this.susbscriber.unsubscribe;
      this.susbscriber = this.monthService.getMonth(this.loggedUser, numberYear + "-" + mm + "-01").subscribe(
        data => { this.days = data }
      );
    }


  }

  backMonth(numberMonth: number, numberYear: number) {
    this.loadMonths.set(this.calendarDate, this.days);

    numberMonth = numberMonth - 1;

    if (numberMonth < 1) {
      numberYear = numberYear - 1;
      numberMonth = 12;
    }
    console.log(numberMonth);

    var mm = String(numberMonth).padStart(2, '0');
    var date = numberYear + '-' + mm;

    this.calendarDate = date;
    this.actualYear = numberYear;
    this.actualMonth = this.months[numberMonth - 1];
    this.actualMonthNumber = numberMonth;

    if (this.loadMonths.get(date) != null) {
      this.days = this.loadMonths.get(date);
    } else {

      this.susbscriber.unsubscribe;
      this.susbscriber = this.monthService.getMonth(this.loggedUser, numberYear + "-" + mm + "-01").subscribe(
        data => { this.days = data });
    }


  }

  async persistChanges() {
    console.log(this.loggedUser);

    let freeDaysAdd: AssignedFreeDay[] = new Array;
    let freeDaysDelete: AssignedFreeDay[] = new Array;

    this.holidaysToAdd.forEach(element => {
      let freeDay = <AssignedFreeDay>{};
      freeDay.userId = this.loggedUser.userId;
      freeDay.date = element.date;
      console.log(element.date);
      freeDaysAdd.push(freeDay);
    });

    this.holidaysToDelete.forEach(element => {
      let freeDay = <AssignedFreeDay>{};
      freeDay.userId = this.loggedUser.userId;
      freeDay.date = element.date;
      freeDaysDelete.push(freeDay);
    });

    if(freeDaysAdd.length > 0){
      this.monthService.addHollidays(this.loggedUser, freeDaysAdd).subscribe(
        data => {
          console.log(data);
        }
      );;
    }
    await this.delay(500);
    if(freeDaysDelete.length > 0){
      this.monthService.deleteHollidays(this.loggedUser, freeDaysDelete).subscribe(
        data => {
          console.log(data)
        }
      );;
    }

    this.holidaysToDelete = new Array;
    this.holidaysToAdd = new Array;
    this.susbscriber.unsubscribe;
    await this.delay(500);
    this.ngOnInit();

  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
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




