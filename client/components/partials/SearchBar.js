import React, { Component } from "react";

class SearchBar extends Component {
  render() {
    return (
      <div className="input-group search-style">
        <input
          className="form-control new-search-bar"
          name="country"
          id="search"
          placeholder="Search Groups"
          type="text"
        />
        <span className="input-group-btn">
          <button className="btn input-btn" type="" id="search-form">
            Search
          </button>
        </span>
      </div>
    );
  }
}

export default SearchBar;
