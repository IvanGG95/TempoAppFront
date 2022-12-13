import { User } from "./userInterface.type"
import { Team } from "./teamInterface.type"
import { Reunion } from "./reunionInterface.type"
import { AssignedFreeDay } from "./assignedFreeDay.type";

export interface Petition {

    petitionId: number;

    creationDate: string;
  
    creator: User;
  
    receiver: User;

    reunion: Reunion

    team: Team;

    assignedFreeDay: AssignedFreeDay;
  
    status: string;
}
