import React, { Component } from "react";
import videojs from "video.js";
import "videojs-vr";
import axios from "axios";
import key from "../kumulosApi";

export default class Video extends Component {
  state = {
    video: {}
  };

  componentDidMount() {
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
      console.log("onPlayerReady", this);
    });

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
        console.log(res.data);
      });
  }

  render() {
    return (
      <div data-vjs-player>
        <video
          ref={node => (this.videoNode = node)}
          className="video-js"
          controls
          playsinline
          webkit-playsinline
          width="100vw"
          height="100vh"
        >
          <source
            src="https://d25at7c7v67khx.cloudfront.net/App+Test/Skill-Suture-Circumferential_Ligature-S-MSState-001/Skill-Suture-Circumferential_Ligature-S-MSState-001.m3u8"
            type="application/x-mpegURL"
          />
        </video>
      </div>
    );
  }
}
