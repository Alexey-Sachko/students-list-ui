import React from "react";
import { Provider } from "react-redux";
import { makeStore } from "./redux";
import StudentsPage from "./components/StudentsPage";

function App() {
  return (
    <Provider store={makeStore()}>
      <StudentsPage />
      {/* Здесь можно будет добавить роутинг */}
    </Provider>
  );
}

export default App;
