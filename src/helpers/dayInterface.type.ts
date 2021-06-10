import { AssignedFreeDay } from "./assignedFreeDay.type";

export interface Day {
    actual: boolean;
    free: boolean;
    festive: boolean;
    taken: boolean;
    holidays: boolean;
    weekEnd: boolean;
    toDelete: boolean;
    date: string;
    dayActual: number;
    assignedFreeDays: AssignedFreeDay[]
}