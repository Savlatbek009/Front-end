import React, { Component } from "react";

class Search extends Component {
  state = {
    search: "avengers",
    type: "all",
  };

  searchHandle = (e) => {
    if (e.key === "Enter") {
      this.props.searchPanel(this.state.search);
    }
  };

  handleFilter = (e) => {
    this.setState(
      () => ({ type: e.target.dataset.type }),
      () => {
        this.props.searchPanel(this.state.search, this.state.type);
      }
    );
  };

  render() {
    return (
      <div className="row container w-100">
        <div className="search-box col-md-6 col-sm-12">
          <div class="d-flex">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search..."
              aria-label="Search"
              value={this.state.search}
              onChange={(e) => this.setState({ search: e.target.value })}
              onKeyDown={this.searchHandle}
            />
            <div className="col-md-3 col-sm-6">
              <button
                onClick={() =>
                  this.props.searchPanel(this.state.search, this.state.type)
                }
                className="btn btn-outline-success"
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="clr"></div>
        <br />
        <div className="filter container">
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              onChange={this.handleFilter}
              name="type"
              data-type="all"
              value="option1"
              checked={this.state.type === "all"}
            />
            <label class="form-check-label" for="exampleRadios1">
              All
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              onChange={this.handleFilter}
              name="type"
              data-type="movie"
              value="option1"
              checked={this.state.type === "movie"}
            />
            <label class="form-check-label" for="exampleRadios1">
              Movies only
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              onChange={this.handleFilter}
              name="type"
              data-type="series"
              value="option1"
              checked={this.state.type === "series"}
            />
            <label class="form-check-label" for="exampleRadios1">
              Series only
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
