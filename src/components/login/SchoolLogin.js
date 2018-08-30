import React, { Component } from "react";
import { Form, Text } from "informed";
import isEmail from "validator/lib/isEmail";
import axios from "axios";
import key from "../kumulosApi";

export default class SchoolLogin extends Component {
  state = { error: null };

  handleSubmit = () => {
    const { email, password } = this.formApi.getState().values;

    axios
      .get(`https://api.kumulos.com/v1/data/7414_7394_schoolUsers`, {
        auth: { username: key }
      })
      .then(res => {
        const authUser = res.data.filter(user => {
          return email === user.email && password === user.password;
        });
        authUser.length
          ? this.props.loginUser({
              email: authUser[0].email,
              firstName: authUser[0].firstName,
              schoolUserID: authUser[0].schoolUserID
            })
          : this.setState({ error: "Invalid username or password." });
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
        {this.props.user && <p>You are logged in.</p>}
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
                <p>{formApi.getError("email")}</p>
                <label htmlFor="password">Password:</label>
                <Text
                  type="password"
                  field="password"
                  id="password"
                  validateOnBlur
                  validate={validatePassword}
                />
                <p>{formApi.getError("password")}</p>
                {this.state.error && <p>{this.state.error}</p>}
                <button type="submit" onSubmit={this.handleSubmit}>
                  Log in
                </button>
              </React.Fragment>
            )}
          </Form>
        )}
      </React.Fragment>
    );
  }
}
