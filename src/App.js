import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import Login from "./components/login/Login";
import MobileLogin from "./components/login/MobileLogin";
import SchoolLogin from "./components/login/SchoolLogin";
import Search from "./components/search/Search";
import Video from "./components/search/Video";
import "./App.css";
import firebase from "firebase/app";
import "firebase/auth";
import config from "./components/login/firebaseConfig";
import axios from "axios";
import qs from "qs";

const apiFunctions =
  process.env.KUMULOS_FUNCTIONS || process.env.REACT_APP_KUMULOS_FUNCTIONS;
const apiSecret =
  process.env.KUMULOS_SECRET || process.env.REACT_APP_KUMULOS_SECRET;

firebase.initializeApp(config);

class App extends Component {
  state = { user: null, quality: "auto" };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        axios({
          method: "POST",
          auth: {
            username: apiFunctions,
            password: apiSecret
          },
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: qs.stringify({ "params[uId]": user.uid }),
          url: `https://api.kumulos.com/b2.2/${apiFunctions}/getUserWithUID.json`
        }).then(res => {
          if (res.data.payload[0].subscribed) {
            this.setState({ user });
          } else {
            this.setState({ user: "unsubscribed" });
          }
        });
      } else {
        const persistUser = localStorage.getItem("userLoggedIn");

        if (persistUser) {
          this.setState({ user: JSON.parse(persistUser) });
        } else {
          this.setState({ user: false });
        }
      }

      const persistQuality = localStorage.getItem("quality");
      if (persistQuality) {
        this.setState({ quality: JSON.parse(persistQuality) });
      }
    });
  }

  loginUser = user => {
    this.setState({ user });
    localStorage.setItem("userLoggedIn", JSON.stringify(this.state.user));
  };

  changeQuality = quality => {
    this.setState({ quality });
    localStorage.setItem("quality", JSON.stringify(this.state.quality));
  };

  checkUserStatus = () => {
    switch (this.state.user) {
      case null:
        return <p>Loading...</p>;
      case false:
        return <Redirect to="/login" />;
      case "unsubscribed":
        return <Redirect to="/login" />;
    }
  };

  render() {
    return (
      <React.Fragment>
        <Route
          exact
          path="/login"
          render={props => <Login {...props} user={this.state.user} />}
        />
        <Route
          path="/login/mobile"
          render={props => <MobileLogin {...props} user={this.state.user} />}
        />
        <Route
          path="/login/school"
          render={props => (
            <SchoolLogin
              {...props}
              loginUser={this.loginUser}
              user={this.state.user}
            />
          )}
        />
        <Route
          path="/search"
          render={props => (
            <Search
              {...props}
              checkUserStatus={this.checkUserStatus}
              user={this.state.user}
            />
          )}
        />
        <Route
          path="/video/:id"
          render={props => (
            <Video
              {...props}
              checkUserStatus={this.checkUserStatus}
              changeQuality={this.changeQuality}
              quality={this.state.quality}
              user={this.state.user}
            />
          )}
        />
      </React.Fragment>
    );
  }
}

export default App;
