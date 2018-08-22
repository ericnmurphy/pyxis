import React, { Component } from "react";
import MobileLogin from "./login/MobileLogin";
import SchoolLogin from "./login/SchoolLogin";

export default class Login extends Component {
  renderLogin = type => {
    switch (type) {
      case "mobile":
        return <MobileLogin />;
      default:
        return <SchoolLogin />;
    }
  };

  render({ loginType } = this.props.location.state) {
    return <div>{this.renderLogin(loginType)}</div>;
  }
}
