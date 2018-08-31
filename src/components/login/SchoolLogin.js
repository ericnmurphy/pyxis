import React, { Component } from "react";
import { Form, Text, Select, Option } from "informed";
import isEmail from "validator/lib/isEmail";
import axios from "axios";
import key from "../kumulosApi";

export default class SchoolLogin extends Component {
  state = { error: null, processing: false, schools: [] };

  componentDidMount() {
    axios
      .get(`https://api.kumulos.com/v1/data/7414_7394_schools`, {
        auth: { username: key }
      })
      .then(res => {
        this.setState({ schools: res.data });
      });
  }

  handleSubmit = () => {
    this.setState({ processing: true });
    const { email, password, school } = this.formApi.getState().values;

    axios
      .get(`https://api.kumulos.com/v1/data/7414_7394_schoolUsers`, {
        auth: { username: key }
      })
      .then(res => {
        console.log(email, password, school);
        const authUser = res.data.filter(user => {
          return (
            email === user.email &&
            password === user.password &&
            school == user.schoolId
          );
        });
        authUser.length
          ? this.props.loginUser({
              email: authUser[0].email,
              firstName: authUser[0].firstName,
              schoolUserID: authUser[0].schoolUserID
            })
          : this.setState({
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

    const validateSelect = value => {
      return !value ? "Please select a school." : null;
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
                <label htmlFor="school">School:</label>

                <Select field="school" validateOnBlur validate={validateSelect}>
                  <Option value="" disabled>
                    Select One...
                  </Option>
                  {this.state.schools.map((school, i) => (
                    <Option key={i} value={school.schoolID}>
                      {school.schoolName}
                    </Option>
                  ))}
                </Select>
                <p className="error">{formApi.getError("school")}</p>
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
