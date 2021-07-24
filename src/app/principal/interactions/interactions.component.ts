import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, timer, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Petition } from 'src/helpers/petitionInterface.type';
import { PetitionUpdateDTO } from 'src/helpers/petitionUpdateInterface.type';
import { User } from 'src/helpers/userInterface.type';
import { PetitionService } from 'src/services/petition.service';

@Component({
  selector: 'app-interactions',
  templateUrl: './interactions.component.html',
  styleUrls: ['./interactions.component.css'],
})
export class InteractionsComponent implements OnInit, OnDestroy {

  subscriptionReciver: Subscription;

  subscriptionOwner: Subscription;

  ownPetitions: Petition[];

  recivedPetitions: Petition[];

  loggedUser: User;

  constructor(private petitionService: PetitionService) {
   }

  ngOnInit() {
    this.loggedUser = JSON.parse(localStorage.getItem('user'));

    this.subscriptionOwner = timer(0, 1000000).pipe(
      switchMap(() => this.petitionService.getOwnPetitions(this.loggedUser))
    ).subscribe(result => this.ownPetitions = result);

    this.subscriptionReciver = timer(0, 1000000).pipe(
      switchMap(() => this.petitionService.getReceiverPetitions(this.loggedUser))
    ).subscribe(result => this.recivedPetitions = result);
    

  }

  ngOnDestroy() {
    this.subscriptionOwner.unsubscribe();
    this.subscriptionReciver.unsubscribe();
 }

  modifyPetition(petitionId: number, status: string){

    const petitionUdate: PetitionUpdateDTO = {
      petitionId: petitionId,
      status: status,
    };

    this.petitionService.putUpdate(this.loggedUser, petitionUdate).subscribe();
      }
}
