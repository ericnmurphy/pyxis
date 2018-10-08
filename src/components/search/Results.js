import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Results extends Component {
  filterVideos = () => {
    return this.props.videos.filter(video => {
      return (
        (this.props.species === "all"
          ? true
          : parseInt(video.speciesId, 10) ===
            parseInt(this.props.species, 10)) &&
        (this.props.surgery === "all"
          ? true
          : parseInt(video.surgeryId, 10) === parseInt(this.props.surgery, 10))
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
                          return (
                            parseInt(species.speciesID, 10) ===
                            parseInt(video.speciesId, 10)
                          );
                        }).name
                      }
                    </span>
                  </div>
                  <div>
                    <span>
                      {
                        this.props.schoolsList.find(school => {
                          return (
                            parseInt(school.schoolID, 10) ===
                            parseInt(video.schoolId, 10)
                          );
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
                          return (
                            parseInt(subject.subjectID, 10) ===
                            parseInt(video.subjectId, 10)
                          );
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
