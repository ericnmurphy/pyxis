import React, { Component } from "react";
import { Route } from "react-router-dom";
import LoginType from "./components/LoginType";
import Login from "./components/Login";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/login-type" component={LoginType} />
        <Route path="/login" component={Login} />
      </div>
    );
  }
}

export default App;
