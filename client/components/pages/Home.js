import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Home extends Component {
  static propTypes = {
    user: PropTypes.object
  };
  render() {
    console.log(this.props.user);
    return (
      <div>
        <h1>Mern Boilerplate Home</h1>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user
  };
}

export default connect(mapStateToProps, null)(Home);
