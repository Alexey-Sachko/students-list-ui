import { StudentPerformance } from "./student-perform.enum";

export interface IStudent {
  id: number;
  lastName: string;
  firstname: string;
  patronymic?: string;
  birthDate: Date;
  performance?: StudentPerformance;
}
