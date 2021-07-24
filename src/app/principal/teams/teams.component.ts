import { Component, OnInit } from '@angular/core';
import { Team } from '../../../helpers/teamInterface.type';
import { User } from '../../../helpers/userInterface.type';
import { TeamService } from '../../../services/team.service';


@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  teams: Team[];

  loggedUser: User;

  constructor(private teamService: TeamService) { }

  ngOnInit() {
    this.loggedUser = JSON.parse(localStorage.getItem('user'));
    this.teamService.getWorkers(this.loggedUser).subscribe(
      data => {
        this.teams = data
      }
    )
  }

}
