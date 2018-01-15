import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { logoutUser } from "../../actions/authentication";

class Header extends Component {
  handleLogout() {
    this.props.logoutUser(this.props.history);
  }
  renderLinks() {
    if (this.props.authenticated === true) {
      return (
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
      );
    } else {
      return (
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
    authenticated: state.auth.authenticated
  };
}

export default withRouter(connect(mapStateToProps, { logoutUser })(Header));
