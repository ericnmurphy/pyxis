import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
//key kept in another file to avoid being pushed to Github
import key from "../kumulosApi";

export default class Search extends Component {
  state = {
    species: [],
    surgeries: [],
    search: { species: null, surgery: null },
    submitted: false
  };

  componentDidMount() {
    axios
      .get(`https://api.kumulos.com/v1/data/7414_7394_species`, {
        auth: { username: key }
      })
      .then(res => {
        this.setState({ species: res.data });
        console.log(res.data);
        return axios.get(
          `https://api.kumulos.com/v1/data/7414_7394_surgeries`,
          { auth: { username: key } }
        );
      })
      .then(res => {
        this.setState({ surgeries: res.data });
        console.log(res.data);
      })
      .catch(function(error) {
        console.log(error);
      });
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
          {this.state.species.map((species, i) => (
            <option key={i} value={species.speciesID}>
              {species.name}
            </option>
          ))}
        </select>
        <select name="surgery" onChange={this.updateSelect} id="surgery">
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
