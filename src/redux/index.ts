import { useSelector, TypedUseSelectorHook } from "react-redux";
import { configureStore, AnyAction } from "@reduxjs/toolkit";
import { rootReducer } from "./reducer";

export const makeStore = () => {
  return configureStore({ reducer: rootReducer });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ReturnType<typeof makeStore>["dispatch"];
export type TypedThunkAction = (
  dispatch: (action: AnyAction | TypedThunkAction) => any | Promise<any>,
  getState: () => RootState
  // extraArgument: any, Здесь можно добавить какой нибудь контекст
) => any | Promise<any>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
