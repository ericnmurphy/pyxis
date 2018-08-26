import React, { Component } from "react";
import { Form, Text } from "informed";
import isEmail from "validator/lib/isEmail";
import axios from "axios";
import key from "../kumulosApi";

export default class SchoolLogin extends Component {
  componentDidMount() {
    axios
      .get(`https://api.kumulos.com/v1/data/7414_7394_schoolUsers`, {
        auth: { username: key }
      })
      .then(res => {
        console.log(res.data);
      });
  }

  handleSubmit = () => {
    const { email, password } = this.formApi.getState().values;

    axios
      .get(`https://api.kumulos.com/v1/data/7414_7394_schoolUsers`, {
        auth: { username: key }
      })
      .then(res => {
        console.log(
          res.data.filter(user => {
            return email == user.email;
          })
        );
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
            <button type="submit">Log in</button>
          </React.Fragment>
        )}
      </Form>
    );
  }
}
