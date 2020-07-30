import React from "react";
import { Provider } from "react-redux";
import { makeStore } from "./redux";

function App() {
  return <Provider store={makeStore()}>App</Provider>;
}

export default App;
