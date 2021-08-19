import { User } from "./userInterface.type"

export interface Team {

    teamId: number;
    
    creationDate: string;

    name: string;
  
    owner: User;
  
    employees: User[];
  
    description: string;
}