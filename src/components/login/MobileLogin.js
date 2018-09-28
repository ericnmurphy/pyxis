import React, { Component } from "react";
import { Form, Text } from "informed";
import isEmail from "validator/lib/isEmail";
import firebase from "firebase/app";
import "firebase/auth";

export default class MobileLogin extends Component {
  state = { error: null, processing: false };

  handleSubmit = () => {
    this.setState({ error: null, processing: true });
    const { email, password } = this.formApi.getState().values;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => {
        this.setState({
          error: "Invalid username or password.",
          processing: false
        });
      });
  };

  setFormApi = formApi => {
    this.formApi = formApi;
  };

  render() {
    const validateEmail = value => {
      return !isEmail(String(value)) ? "Please enter a valid email." : null;
    };

    const validatePassword = value => {
      return !value ? "Please enter a password." : null;
    };
    return (
      <React.Fragment>
        {this.props.user &&
          (this.props.user === "unsubscribed" ? (
            <React.Fragment>
              <p>You're not currently subscribed.</p>
              <p>You can manage your subscription through the app.</p>
            </React.Fragment>
          ) : (
            <p>You are logged in.</p>
          ))}
        {this.props.user === null && <p>Loading...</p>}
        {this.props.user === false && (
          <Form onSubmit={this.handleSubmit} getApi={this.setFormApi}>
            {({ formApi }) => (
              <React.Fragment>
                <label htmlFor="email">Email:</label>
                <Text
                  field="email"
                  id="email"
                  validateOnBlur
                  validate={validateEmail}
                />
                <p className="error">{formApi.getError("email")}</p>
                <label htmlFor="password">Password:</label>
                <Text
                  type="password"
                  field="password"
                  id="password"
                  validateOnBlur
                  validate={validatePassword}
                />
                <p className="error">{formApi.getError("password")}</p>
                <button disabled={this.state.processing} type="submit">
                  {this.state.processing ? "Logging in..." : "Log in"}
                </button>
                {this.state.error && (
                  <p className="error">{this.state.error}</p>
                )}
              </React.Fragment>
            )}
          </Form>
        )}
      </React.Fragment>
    );
  }
}
