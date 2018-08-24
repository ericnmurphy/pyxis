import React, { Component } from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";
import key from "../kumulosApi";

export default class Results extends Component {
  state = {
    videos: []
  };

  componentDidMount() {
    axios
      .get(`https://api.kumulos.com/v1/data/7414_7394_videoMetadatas`, {
        auth: { username: key }
      })
      .then(res => {
        this.setState({ videos: res.data });
        console.log(res.data);
      });
  }

  render() {
    const query = queryString.parse(this.props.location.search);
    return this.state.videos
      .filter(video => {
        return (
          video.speciesId == query.species && video.surgeryId == query.surgery
        );
      })
      .map((video, i) => (
        <div key={i}>
          <h3>
            <Link to={`/video/${video.videoMetadataID}`}>{video.title}</Link>
          </h3>
          <p>{video.desc}</p>
        </div>
      ));
  }
}
