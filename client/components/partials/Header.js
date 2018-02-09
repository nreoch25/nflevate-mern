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
            Admin <i className="fas fa-edit" />
          </Link>
        </li>
      );
    }
  }
  renderLinks() {
    if (this.props.authenticated === true) {
      return (
        <div className="collapse navbar-collapse" id="myNavbar">
          <ul className="nav navbar-nav navbar-right">
            <li className="dropdown">
              <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                <span className="glyphicon fa fa-bell nav-glyphicon" />
                <b className="caret" />
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a style={{ cursor: "pointer" }}>
                    <span className="glyphicon glyphicon-user" /> Friend
                    Requests
                  </a>
                </li>
              </ul>
            </li>
            {this.checkAdmin()}
            <li className="dropdown">
              <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                {this.props.user.username}
                <span className="caret" />
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={this.handleLogout.bind(this)}
                  >
                    <span className="glyphicon glyphicon-log-out" /> Logout
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
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
