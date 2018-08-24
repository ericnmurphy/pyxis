import React, { Component } from "react";
import axios from "axios";
import key from "../kumulosApi";

export default class Video extends Component {
  state = {
    video: {}
  };

  componentDidMount() {
    axios
      .get(`https://api.kumulos.com/v1/data/7414_7394_videoMetadatas`, {
        auth: { username: key }
      })
      .then(res => {
        const index = res.data.findIndex(
          index => index.videoMetadataID == this.props.match.params.id
        );
        this.setState({ video: res.data[index] });
        console.log(res.data);
      });
  }

  render() {
    return (
      <div>
        <h2>{this.props.match.params.id}</h2>
        <div id="vrview" />
      </div>
    );
  }
}
