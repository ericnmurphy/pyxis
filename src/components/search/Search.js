import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Results from "./Results";
//key kept in another file to avoid being pushed to Github
import key from "../kumulosApi";

export default class Search extends Component {
  state = {
    species: [],
    surgeries: [],
    videos: [],
    search: { species: "all", surgery: "all" },
    status: "search"
  };

  getSpecies = () => {
    return axios.get(`https://api.kumulos.com/v1/data/7414_7394_species`, {
      auth: { username: key }
    });
  };

  getSurgeries = () => {
    return axios.get(`https://api.kumulos.com/v1/data/7414_7394_surgeries`, {
      auth: { username: key }
    });
  };

  getVideos = () => {
    return axios.get(
      `https://api.kumulos.com/v1/data/7414_7394_videoMetadatas`,
      {
        auth: { username: key }
      }
    );
  };

  componentDidMount() {
    axios.all([this.getSpecies(), this.getSurgeries(), this.getVideos()]).then(
      axios.spread((species, surgeries, videos) => {
        this.setState({
          species: species.data,
          surgeries: surgeries.data,
          videos: videos.data
        });

        console.log(species.data, surgeries.data, videos.data);
      })
    );
  }

  updateSelect = e => {
    this.setState({
      search: {
        ...this.state.search,
        [e.target.name]: e.target.value
      }
    });
  };

  renderResults = () => {
    this.setState({
      status: "results"
    });
  };

  renderSearch = () => {
    this.setState({
      status: "search"
    });
  };

  render() {
    return (
      <React.Fragment>
        {this.props.user === null && <p>Loading...</p>}
        {this.props.user === false && <Redirect to="/login" />}
        {this.props.user && (
          <React.Fragment>
            {this.state.status === "search" ? (
              <React.Fragment>
                <h3>Species</h3>
                <select
                  name="species"
                  value={this.state.search.species}
                  onChange={this.updateSelect}
                  id="species"
                >
                  <option value="all">ALL</option>
                  {this.state.species.map((species, i) => (
                    <option key={i} value={species.speciesID}>
                      {species.name}
                    </option>
                  ))}
                </select>
                <h3>Surgeries</h3>
                <select
                  name="surgery"
                  value={this.state.search.surgery}
                  onChange={this.updateSelect}
                  id="surgery"
                >
                  <option value="all">ALL</option>
                  {this.state.surgeries.map((surgery, i) => (
                    <option key={i} value={surgery.surgeryID}>
                      {surgery.name}
                    </option>
                  ))}
                </select>
                <button type="button" onClick={this.renderResults}>
                  Search
                </button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Results
                  species={this.state.search.species}
                  surgery={this.state.search.surgery}
                  videos={this.state.videos}
                />
                <button type="button" onClick={this.renderSearch}>
                  Back
                </button>
              </React.Fragment>
            )}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
