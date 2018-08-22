import React, { Component } from "react";
import axios from "axios";
import key from "./kumulosApi";

export default class Search extends Component {
  componentDidMount() {
    axios({
      method: "post",
      url: `https://api.kumulos.com/b2.2/${key}/schools.json`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(function(response) {
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return <div>Hello World</div>;
  }
}
