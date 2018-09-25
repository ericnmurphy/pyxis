import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Results from "./Results";

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
    return axios({
      method: "post",
      url: `https://api.kumulos.com/b2.2/${apiFunctions}/getAllVideos.json`,
      auth: {
        username: apiFunctions,
        password: apiSecret
      }
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
          console.log(videos.data);
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
              <div className="results-container">
                <Results
                  speciesList={this.state.species}
                  species={this.state.search.species}
                  surgery={this.state.search.surgery}
                  videos={this.state.videos}
                  schoolsList={this.state.schools}
                  subjectsList={this.state.subjects}
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
