import React, { Component } from "react";
import { Link } from "react-router-dom";
import key from "../kumulosApi";

export default class Results extends Component {
  filterVideos = () => {
    return this.props.videos.filter(video => {
      return (
        (this.props.species === "all"
          ? true
          : video.speciesId == this.props.species) &&
        (this.props.surgery === "all"
          ? true
          : video.surgeryId == this.props.surgery)
      );
    });
  };

  render() {
    return (
      <React.Fragment>
        {this.filterVideos().length !== 0 ? (
          this.filterVideos().map((video, i) => (
            <div key={i}>
              <h3>
                <Link to={`/video/${video.videoMetadataID}`}>
                  {video.title}
                </Link>
              </h3>
              <p>{video.desc}</p>
            </div>
          ))
        ) : (
          <p>No results match your search.</p>
        )}
      </React.Fragment>
    );
  }
}
