import React, { Component } from "react";
import { Route } from "react-router-dom";
import Login from "./components/login/Login";
import MobileLogin from "./components/login/MobileLogin";
import SchoolLogin from "./components/login/SchoolLogin";
import Search from "./components/search/Search";
import Results from "./components/search/Results";
import Video from "./components/search/Video";
import "./App.css";
import firebase from "firebase/app";
import "firebase/auth";
import config from "./components/login/firebaseConfig";

const auth = firebase.initializeApp(config);

class App extends Component {
  state = { user: null };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      }
    });
  }

  render() {
    return (
      <React.Fragment>
        <Route exact path="/login" component={Login} />
        <Route
          path="/login/mobile"
          render={props => <MobileLogin {...props} user={this.state.user} />}
        />
        <Route path="/login/school" component={SchoolLogin} />
        <Route path="/search" component={Search} />
        <Route path="/results" component={Results} />
        <Route path="/video/:id" component={Video} />
      </React.Fragment>
    );
  }
}

export default App;
