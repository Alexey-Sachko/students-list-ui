import React from "react";
import { Provider } from "react-redux";
import { CssBaseline } from "@material-ui/core";
import { makeStore } from "./redux";
import StudentsPage from "./components/StudentsPage";

function App() {
  return (
    <Provider store={makeStore()}>
      <CssBaseline />
      <StudentsPage />
      {/* Здесь можно будет добавить роутинг */}
    </Provider>
  );
}

export default App;
