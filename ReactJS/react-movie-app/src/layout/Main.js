import React, { Component } from "react";
import Loader from "../components/Loader";
import Movies from "../components/Movies";
import Search from "../components/Search";

class Main extends Component {
  state = {
    movies: [],
    loading: true,
  };
  componentDidMount() {
    fetch("http://www.omdbapi.com/?apikey=329ffa13&s=avengers")
      .then((response) => response.json())
      .then((data) => this.setState({ movies: data.Search, loading: false }));
  }
  searchPanel = (str, type = "all") => {
    this.setState({ loading: true });
    fetch(
      `http://www.omdbapi.com/?apikey=329ffa13&s=${str}${
        type !== "all" ? `&type=${type}` : ""
      }`
    )
      .then((response) => response.json())
      .then((data) => this.setState({ movies: data.Search, loading: false }));
  };
  render() {
    return (
      <div className="content">
        <br />
        <Search searchPanel={this.searchPanel} />
        {this.state.loading ? (
          <Loader />
        ) : (
          <Movies movies={this.state.movies} />
        )}
      </div>
    );
  }
}

export default Main;
