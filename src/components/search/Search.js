import React, { Component } from "react";
import axios from "axios";
import qs from "qs";
import Results from "./Results";
import { createHashHistory } from "history";
createHashHistory();

const apiKey = process.env.KUMULOS_API || process.env.REACT_APP_KUMULOS_API;
const apiFunctions =
  process.env.KUMULOS_FUNCTIONS || process.env.REACT_APP_KUMULOS_FUNCTIONS;
const apiSecret =
  process.env.KUMULOS_SECRET || process.env.REACT_APP_KUMULOS_SECRET;

export default class Search extends Component {
  state = {
    species: [],
    surgeries: [],
    videos: [],
    schools: [],
    subjects: [],
    search: { species: "all", surgery: "all" },
    status: "search"
  };

  componentDidUpdate() {
    window.onpopstate = e => {
      if (this.state.status === "results") {
        this.setState({ status: "search" });
        this.props.history.push("/search");
      }
    };
  }

  componentWillUnmount = () => {
    this.isCanceled = true;
  };

  getSpecies = () => {
    return axios.get(`https://api.kumulos.com/v1/data/7414_7394_species`, {
      auth: { username: apiKey }
    });
  };

  getSurgeries = () => {
    return axios.get(`https://api.kumulos.com/v1/data/7414_7394_surgeries`, {
      auth: { username: apiKey }
    });
  };

  getVideos = () => {
    return axios.get(
      `https://api.kumulos.com/v1/data/7414_7394_videoMetadatas`,
      {
        auth: { username: apiKey }
      }
    );
  };

  filterSurgeries = id => {
    id === "all"
      ? axios
          .get(`https://api.kumulos.com/v1/data/7414_7394_surgeries`, {
            auth: { username: apiKey }
          })
          .then(res => {
            !this.isCanceled && this.setState({ surgeries: res.data });
          })
      : axios({
          method: "POST",
          auth: {
            username: apiFunctions,
            password: apiSecret
          },
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: qs.stringify({ "params[speciesId]": id }),
          url: `https://api.kumulos.com/b2.2/${apiFunctions}/getSurgiesBySpecies.json`
        }).then(res => {
          !this.isCanceled && this.setState({ surgeries: res.data.payload });
        });
  };

  getSchools = () => {
    return axios.get(`https://api.kumulos.com/v1/data/7414_7394_schools`, {
      auth: { username: apiKey }
    });
  };

  getSubjects = () => {
    return axios.get(`https://api.kumulos.com/v1/data/7414_7394_subjects`, {
      auth: { username: apiKey }
    });
  };

  componentDidMount() {
    axios
      .all([
        this.getSpecies(),
        this.getSurgeries(),
        this.getVideos(),
        this.getSchools(),
        this.getSubjects()
      ])
      .then(
        axios.spread((species, surgeries, videos, schools, subjects) => {
          !this.isCanceled &&
            this.setState({
              species: species.data,
              surgeries: surgeries.data,
              videos: videos.data,
              schools: schools.data,
              subjects: subjects.data
            });
        })
      );
  }

  updateSelect = e => {
    if (e.target.name === "species") {
      this.filterSurgeries(e.target.value);
    }
    !this.isCanceled &&
      this.setState({
        search: {
          ...this.state.search,
          [e.target.name]: e.target.value
        }
      });
  };

  renderResults = () => {
    this.props.history.push("/search/results");
    !this.isCanceled &&
      this.setState({
        status: "results"
      });
  };

  renderSearch = () => {
    !this.isCanceled &&
      this.setState({
        status: "search"
      });
    this.props.history.push("/search");
  };

  render() {
    return (
      <React.Fragment>
        {this.props.checkUserStatus()}
        {this.props.user &&
          this.props.user !== "unsubscribed" && (
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
                <div className="results-container">
                  <Results
                    speciesList={this.state.species}
                    species={this.state.search.species}
                    surgery={this.state.search.surgery}
                    videos={this.state.videos}
                    schoolsList={this.state.schools}
                    subjectsList={this.state.subjects}
                    backToSearch={this.backToSearch}
                  />
                  <button type="button" onClick={this.renderSearch}>
                    Back
                  </button>
                </div>
              )}
            </React.Fragment>
          )}
      </React.Fragment>
    );
  }
}
