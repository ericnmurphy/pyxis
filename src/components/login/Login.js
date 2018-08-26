import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Login extends Component {
  render() {
    return (
      <div>
        <p>Are you a mobile or school user?</p>
        <Link
          to={{
            pathname: "/login/mobile"
          }}
        >
          Mobile User
        </Link>
        <Link
          to={{
            pathname: "/login/school"
          }}
        >
          School User
        </Link>
      </div>
    );
  }
}
