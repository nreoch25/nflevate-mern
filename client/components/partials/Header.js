import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { logoutUser } from "../../actions/authentication";

class Header extends Component {
  handleLogout() {
    this.props.logoutUser(this.props.history);
  }
  checkAdmin() {
    if (this.props.user && this.props.user.type === "admin") {
      return (
        <li className="nav-item">
          <Link to="/admin" className="nav-link">
            Admin <i className="fa fa-edit" />
          </Link>
        </li>
      );
    }
  }
  renderLinks() {
    if (this.props.authenticated === true) {
      return (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              id="alertdropdown"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              href="#"
            >
              <i className="fa fa-bell" />
            </a>
            <div
              className="dropdown-menu dropdown-menu-right"
              aria-labelledby="alertdropdown"
            >
              <a className="dropdown-item" href="#">
                Friend Requests
              </a>
            </div>
          </li>
          {this.checkAdmin()}
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              id="userdropdown"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              href="#"
            >
              {this.props.user.username}
            </a>
            <div
              className="dropdown-menu dropdown-menu-right"
              aria-labelledby="userdropdown"
            >
              <a
                className="dropdown-item"
                href="#"
                onClick={this.handleLogout.bind(this)}
              >
                Logout
              </a>
            </div>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/signup">
              Sign Up <i className="fa fa-user-plus" />
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Login <i className="fa fa-sign-in" />
            </Link>
          </li>
        </ul>
      );
    }
  }
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <Link className="navbar-brand" to="/home">
          NFLevate
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#nflevateNav"
          aria-controls="nflevateNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="nflevateNav">
          {this.renderLinks()}
        </div>
      </nav>
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
