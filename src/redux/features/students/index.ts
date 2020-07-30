import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import Axios from "axios";
import { IStudent } from "../../../types/student.interface";
import { TypedThunkAction, RootState } from "../..";

type StudentsState = {
  loading: boolean;
  error: string | null;
  items: {
    ids: number[];
    byId: Record<string | number, IStudent>;
  };
};

const initialState: StudentsState = {
  items: {
    byId: {},
    ids: [],
  },
  error: null,
  loading: false,
};

const studentsMapSelector = (s: RootState) => s.students.items.byId;
const studentsIdsSelector = (s: RootState) => s.students.items.ids;

export const studentsListSelector = createSelector(
  studentsMapSelector,
  studentsIdsSelector,
  (byId, ids) => {
    return ids.map((id) => byId[id]);
  }
);

const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchError: (state, { payload }: PayloadAction<string>) => {
      state.loading = false;
      state.error = payload;
    },
    fetchSuccess: (state, { payload }: PayloadAction<IStudent[]>) => {
      state.loading = false;
      state.items.ids = payload.map((student) => {
        state.items.byId[student.id] = student;
        return student.id;
      });
    },
  },
});

export const studentsReducer = studentsSlice.reducer;

const { fetchStart, fetchSuccess, fetchError } = studentsSlice.actions;

export const fetchStudendsList = (): TypedThunkAction => async (dispatch) => {
  dispatch(fetchStart());
  try {
    const res = await Axios.get("/");
    dispatch(fetchSuccess(res.data));
  } catch (error) {
    dispatch(fetchError("something went wrong"));
  }
};
