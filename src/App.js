import React from "react";
import { Route } from "react-router-dom";
import MainPage from "../src/pages/MainPage";
import ContactList from "../src/pages/ContactList";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={MainPage} />
      <Route exact path="/contact" component={ContactList} />
    </div>
  );
}

export default App;
