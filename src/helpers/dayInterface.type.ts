import { AssignedFreeDay } from "./assignedFreeDay.type";
import { Reunion } from "./reunionInterface.type";

export interface Day {
    actual: boolean;
    free: boolean;
    festive: boolean;
    taken: boolean;
    holidays: boolean;
    weekEnd: boolean;
    pending: boolean;
    toDelete: boolean;
    date: string;
    dayActual: number;
    assignedFreeDays: AssignedFreeDay[];
    reunions: Reunion[]
}