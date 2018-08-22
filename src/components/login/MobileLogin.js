import React, { Component } from "react";
import { Form, Text } from "informed";
import isEmail from "validator/lib/isEmail";
import firebase from "firebase/app";
import "firebase/auth";
import config from "./firebaseConfig";

const auth = firebase.initializeApp(config);

export default class MobileLogin extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.setFormApi = this.setFormApi.bind(this);
  }

  handleSubmit() {
    const { email, password } = this.formApi.getState().values;
    console.log(email, password);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function(error) {
        console.log(error);
      });
  }

  setFormApi(formApi) {
    this.formApi = formApi;
  }

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
