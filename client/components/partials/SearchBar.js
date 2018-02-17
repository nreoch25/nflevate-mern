import React, { Component } from "react";
import { connect } from "react-redux";
import { filterGroups } from "../../actions/groups";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchVal: ""
    };
  }
  filterGroups = evt => {
    evt.preventDefault();
    this.props.filterGroups(this.state.searchVal);
  };
  onSearchChange = evt => {
    this.setState({ searchVal: evt.target.value });
  };
  render() {
    return (
      <div className="input-group search-style">
        <input
          className="form-control new-search-bar"
          name="group"
          id="search"
          placeholder="Search Groups"
          type="text"
          value={this.state.searchVal}
          onChange={this.onSearchChange}
        />
        <span className="input-group-btn">
          <button
            onClick={this.filterGroups}
            className="btn input-btn"
            type=""
            id="search-form"
          >
            Search
          </button>
        </span>
      </div>
    );
  }
}

export default connect(null, { filterGroups })(SearchBar);
