import React, { Component } from "react";
import { Route } from "react-router-dom";
import LoginType from "./components/LoginType";
import Login from "./components/Login";
import Search from "./components/search/Search";
import Results from "./components/search/Results";
import Video from "./components/search/Video";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/login-type" component={LoginType} />
        <Route path="/login" component={Login} />
        <Route path="/search" component={Search} />
        <Route path="/results" component={Results} />
        <Route path="/video/:id" component={Video} />
      </div>
    );
  }
}

export default App;
