export interface User {
    userId: number;
    workedHours: number;
    availableFreeDays: number;
    weeklyWorkHours: number;
    username: string;
    password: string;
    email: string;
    personInChargeId: User;
    roles: Role[];
  }
  
interface Role {
    name: string;
}