import React, { Component } from "react";
import { connect } from "react-redux";
import requireAuth from "../hoc/requireAuth";
import { fetchGroups } from "../../actions/groups.js";

import OnlineUsers from "../partials/OnlineUsers";
import SearchBar from "../partials/SearchBar";
import Card from "../partials/Card";

class Home extends Component {
  componentWillMount() {
    this.props.fetchGroups();
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <form>
              <div className="form-group">
                <SearchBar />
              </div>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-8">
            <div className="row">
              <div className="col-sm-12 col-md-6 no-padding-left">
                <Card />
              </div>
              <div className="col-sm-12 col-md-6 no-padding-left">
                <Card />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6" style={{ backgroundColor: "#000" }}>
                col1
              </div>
              <div className="col-sm-6" style={{ backgroundColor: "#fff" }}>
                col2
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6" style={{ backgroundColor: "#fff" }}>
                col1
              </div>
              <div className="col-sm-6" style={{ backgroundColor: "#000" }}>
                col2
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="row">
              <OnlineUsers />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    groups: state.groups.groups
  };
}

export default requireAuth(connect(mapStateToProps, { fetchGroups })(Home));
