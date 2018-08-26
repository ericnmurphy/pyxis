import React, { Component } from "react";
import { Route } from "react-router-dom";
import Login from "./components/login/Login";
import MobileLogin from "./components/login/MobileLogin";
import SchoolLogin from "./components/login/SchoolLogin";
import Search from "./components/search/Search";
import Results from "./components/search/Results";
import Video from "./components/search/Video";
import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Route exact path="/login" component={Login} />
        <Route path="/login/mobile" component={MobileLogin} />
        <Route path="/login/school" component={SchoolLogin} />
        <Route path="/search" component={Search} />
        <Route path="/results" component={Results} />
        <Route path="/video/:id" component={Video} />
      </React.Fragment>
    );
  }
}

export default App;
