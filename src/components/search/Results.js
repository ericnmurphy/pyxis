import React, { Component } from "react";
import { Link } from "react-router-dom";

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
            <Link
              className="result-link"
              to={`/video/${video.videoMetadataID}`}
              key={i}
            >
              <div className="result">
                <div>
                  <h3>{video.title}</h3>
                  <div className="results-first-span">
                    <span>
                      {
                        this.props.speciesList.find(species => {
                          return species.speciesID == video.speciesId;
                        }).name
                      }
                    </span>
                  </div>
                  <div>
                    <span>
                      {
                        this.props.schoolsList.find(school => {
                          return school.schoolID == video.schoolId;
                        }).schoolName
                      }
                    </span>
                  </div>
                  <div className="notes">
                    <p>NOTES:</p>
                    <p>{video.desc}</p>
                  </div>
                </div>
                <div>
                  <div className="type">
                    <span>{video.type}</span>
                  </div>
                  <div>
                    <span>
                      {
                        this.props.subjectsList.find(subject => {
                          return subject.subjectID == video.subjectId;
                        }).subjectType
                      }
                    </span>
                  </div>
                  <div className="number">
                    <span>{video.videoNumber}</span>
                  </div>
                  <div>
                    <span className="class">
                      Class:
                      <br />
                      {video.classNumber}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No results match your search.</p>
        )}
      </React.Fragment>
    );
  }
}
