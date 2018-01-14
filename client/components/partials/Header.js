import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
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
          </nav>
        </div>
      </div>
    );
  }
}

export default Header;
