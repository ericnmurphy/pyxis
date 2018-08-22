import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class LoginType extends Component {
  render() {
    return (
      <div>
        <p>Are you a mobile or school user?</p>
        <Link
          to={{
            pathname: "/login",
            state: {
              loginType: "mobile"
            }
          }}
        >
          Mobile User
        </Link>
        <Link
          to={{
            pathname: "/login",
            state: {
              loginType: "school"
            }
          }}
        >
          School User
        </Link>
      </div>
    );
  }
}
