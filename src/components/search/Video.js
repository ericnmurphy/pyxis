import React, { Component } from "react";
import videojs from "video.js";
import "videojs-vr";
import axios from "axios";

const key = process.env.KUMULOS_API || process.env.REACT_APP_KUMULOS_API;

export default class Video extends Component {
  state = {
    video: {}
  };

  componentDidMount() {
    this.player = videojs(this.videoNode, this.props);

    this.player.vr({ projection: "360" });
    axios
      .get(`https://api.kumulos.com/v1/data/7414_7394_videoMetadatas`, {
        auth: { username: key }
      })
      .then(res => {
        const index = res.data.findIndex(
          index => index.videoMetadataID == this.props.match.params.id
        );
        this.setState({ video: res.data[index] });
        this.player.src({
          type: "application/x-mpegURL",
          src: this.state.video.videoURL
        });
      });
  }

  render() {
    return (
      <React.Fragment>
        {this.props.checkUserStatus()}

        <div data-vjs-player>
          <video
            ref={node => (this.videoNode = node)}
            className="video-js"
            controls
            playsInline
            webkit-playsinline="true"
            width="100vw"
            height="100vh"
          />
        </div>
      </React.Fragment>
    );
  }
}
