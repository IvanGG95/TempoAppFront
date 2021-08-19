import { Team } from "./teamInterface.type";

export interface Reunion {

    reunionId: number;

    name: string;

    date: string;

    creator: string;
    
    description: string;

    assistant: string[];

    days: string;
    
    hours: string;

    team: Team;
}