import React from "react";
import { Provider } from "react-redux";
import { CssBaseline } from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { makeStore } from "./redux";
import StudentsPage from "./components/StudentsPage";

function App() {
  return (
    <Provider store={makeStore()}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <CssBaseline />
        <StudentsPage />
        {/* Здесь можно будет добавить роутинг */}
      </MuiPickersUtilsProvider>
    </Provider>
  );
}

export default App;
