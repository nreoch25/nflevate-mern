import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { logoutUser } from "../../actions/authentication";

class Header extends Component {
  handleLogout() {
    this.props.logoutUser(this.props.history);
  }
  renderLinks() {
    console.log("AUTHENTICATED USER", this.props.user);
    if (this.props.authenticated === true) {
      return (
        <div className="collapse navbar-collapse" id="myNavbar">
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a
                style={{ cursor: "pointer" }}
                onClick={this.handleLogout.bind(this)}
              >
                <span className="glyphicon glyphicon-log-out" /> Logout
              </a>
            </li>
          </ul>
        </div>
      );
    } else {
      return (
        <div className="collapse navbar-collapse" id="myNavbar">
          <ul className="nav navbar-nav navbar-right">
            <li>
              <Link to="/signup">
                <span className="glyphicon glyphicon-user" /> Sign Up
              </Link>
            </li>
            <li>
              <Link to="/">
                <span className="glyphicon glyphicon-log-in" /> Login
              </Link>
            </li>
          </ul>
        </div>
      );
    }
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <nav className="navbar navbar-inverse navbar-static-top">
            <div className="container-fluid">
              <div className="navbar-header">
                <button
                  type="button"
                  className="navbar-toggle"
                  data-toggle="collapse"
                  data-target="#myNavbar"
                >
                  <span className="icon-bar" />
                  <span className="icon-bar" />
                  <span className="icon-bar" />
                </button>
                <Link to="/home" className="navbar-brand">
                  NFLevate
                </Link>
              </div>
              {this.renderLinks()}
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    user: state.auth.user
  };
}

export default withRouter(connect(mapStateToProps, { logoutUser })(Header));
