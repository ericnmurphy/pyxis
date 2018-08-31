import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Login extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.user && <p>You are logged in.</p>}
        {this.props.user === null && <p>Loading...</p>}
        {this.props.user === false && (
          <React.Fragment>
            <p>Are you a mobile or school user?</p>
            <div className="login">
              <Link
                className="login-box"
                to={{
                  pathname: "/login/school"
                }}
              >
                <h3>Academic Users</h3>
                <p>Click Here</p>
              </Link>
              <Link
                className="login-box"
                to={{
                  pathname: "/login/mobile"
                }}
              >
                <h3>Mobile Subscribers</h3>
                <p>Click Here</p>
              </Link>
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
