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

    axios
      .get(`https://api.kumulos.com/v1/data/7414_7394_videoMetadatas`, {
        auth: { username: key }
      })
      .then(res => {
        const index = res.data.findIndex(
          index =>
            parseInt(index.videoMetadataID, 10) ===
            parseInt(this.props.match.params.id, 10)
        );
        this.setState({ video: res.data[index] });

        const qualities = [
          {
            label: "4k",
            src: this.state.video.videoURL.replace(/(\.[\w\d_-]+)$/i, "4k.m3u8")
          },
          {
            label: "2k",
            src: this.state.video.videoURL.replace(/(\.[\w\d_-]+)$/i, "2k.m3u8")
          },
          {
            label: "1080p",
            src: this.state.video.videoURL.replace(
              /(\.[\w\d_-]+)$/i,
              "1080p.m3u8"
            )
          },
          {
            label: "auto",
            src: this.state.video.videoURL
          }
        ];

        const matchUrl = qualities.filter(
          quality => quality.label === this.props.quality
        );

        this.player.src({
          type: "application/x-mpegURL",
          src: matchUrl[0].src
        });

        const fullscreenControl = document.querySelector(
          ".vjs-fullscreen-control"
        );

        fullscreenControl.insertAdjacentHTML(
          "beforebegin",
          '<div class="quality_setting vjs-menu-button vjs-menu-button-popup vjs-control vjs-button"><button class="vjs-menu-button vjs-menu-button-popup vjs-button" type="button" aria-live="polite" aria-disabled="false" title="Quality" aria-haspopup="true" aria-expanded="false"><span aria-hidden="true" class="vjs-icon-cog"></span><span class="vjs-control-text">Quality</span></button><div class="vjs-menu"><ul class="quality_ul vjs-menu-content" role="menu"></ul></div></div>'
        );

        qualities.forEach((quality, i) => {
          document.querySelector(".quality_ul").insertAdjacentHTML(
            "afterbegin",
            `<li class="vjs-menu-item ${this.props.quality === quality.label &&
              "vjs-selected"}" tabindex="
                ${i}
                " role="menuitemcheckbox" aria-live="polite" aria-disabled="false" aria-checked="false" data-src="
                ${quality.src}
                " data-label="${
                  quality.label
                }"><span class="vjs-menu-item-text">
                ${quality.label}
                </span></li>`
          );
        });

        document.addEventListener("click", e => {
          if (e.target.classList.contains("vjs-menu-item")) {
            const active = document.querySelector(".quality_ul .vjs-selected");
            if (active) {
              active.classList.remove("vjs-selected");
            }
            e.target.classList.add("vjs-selected");

            this.props.changeQuality(e.target.getAttribute("data-label"));

            this.player.src({
              type: "application/x-mpegURL",
              src: e.target.getAttribute("data-src")
            });
          }
        });
      });
    this.player.vr({ projection: "360" });
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
