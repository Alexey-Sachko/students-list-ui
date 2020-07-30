import { combineReducers } from "redux";
import { studentsReducer } from "./features/students";
import { addStudentReducer } from "./features/add-student";

export const rootReducer = combineReducers({
  students: studentsReducer,
  addStudent: addStudentReducer,
});
