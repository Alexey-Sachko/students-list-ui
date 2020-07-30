import { IStudent } from "./student.interface";

export type ICreateStudentDto = Omit<IStudent, "id">;
