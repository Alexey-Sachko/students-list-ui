import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypedThunkAction } from "../..";
import Axios from "axios";
import { config } from "../../../config";
import { ICreateStudentDto } from "../../../types/create-student-dto.interface";
import { addStudent } from "../students";

type AddStudentState = {
  loading: boolean;
  error: string | undefined;
};

const initialState: AddStudentState = {
  loading: false,
  error: undefined,
};

const addStudentSlice = createSlice({
  name: "addStudent",
  initialState,
  reducers: {
    submitStart: (state) => {
      state.loading = true;
      state.error = undefined;
    },
    submitError: (state, { payload }: PayloadAction<string>) => {
      state.loading = false;
      state.error = payload;
    },
    submitSuccess: (state) => {
      state.loading = false;
    },
  },
});

export const addStudentReducer = addStudentSlice.reducer;

const { submitError, submitStart, submitSuccess } = addStudentSlice.actions;

export const submitAddStudent = (
  body: ICreateStudentDto
): TypedThunkAction => async (dispatch) => {
  dispatch(submitStart());
  try {
    const res = await Axios.post(`${config.apiBaseUrl}/students`, body);
    dispatch(addStudent(res.data));
    dispatch(submitSuccess());
  } catch (error) {
    dispatch(submitError("Something went wrong"));
  }
};
