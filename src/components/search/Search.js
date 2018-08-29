import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
//key kept in another file to avoid being pushed to Github
import key from "../kumulosApi";

export default class Search extends Component {
  state = {
    species: [],
    surgeries: [],
    search: { species: "all", surgery: "all" },
    submitted: false
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

  componentDidMount() {
    axios.all([this.getSpecies(), this.getSurgeries()]).then(
      axios.spread((species, surgeries) => {
        this.setState({ species: species.data, surgeries: surgeries.data });

        console.log(species.data, surgeries.data);
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

  render() {
    return (
      <div>
        <select name="species" onChange={this.updateSelect} id="species">
          <option value="all">ALL</option>
          {this.state.species.map((species, i) => (
            <option key={i} value={species.speciesID}>
              {species.name}
            </option>
          ))}
        </select>
        <select name="surgery" onChange={this.updateSelect} id="surgery">
          <option value="all">ALL</option>
          {this.state.surgeries.map((surgery, i) => (
            <option key={i} value={surgery.surgeryID}>
              {surgery.name}
            </option>
          ))}
        </select>
        <Link
          to={{
            pathname: "/results",
            search: `?species=${this.state.search.species}&surgery=${
              this.state.search.surgery
            }`
          }}
        >
          Search
        </Link>
      </div>
    );
  }
}
