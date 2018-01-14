import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import requireAuth from "../hoc/requireAuth";

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Mern Boilerplate Home</h1>
      </div>
    );
  }
}

export default requireAuth(Home);
