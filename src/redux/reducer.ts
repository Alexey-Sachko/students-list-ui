import { combineReducers } from "redux";
import { studentsReducer } from "./features/students";

export const rootReducer = combineReducers({ students: studentsReducer });
