import { User } from "./userInterface.type"

export interface Team {

    creationDate: string;

    name: string;
  
    owner: User;
  
    employees: User[];
  
    description: string;
}