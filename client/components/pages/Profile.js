import React, { Component } from "react";
import { connect } from "react-redux";
import requireAuth from "../hoc/requireAuth";

class Profile extends Component {
  renderProfileLinks() {
    if (this.props.user.username === this.props.match.params.user) {
      return (
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Update Profile Information</li>
        </ul>
      );
    } else {
      return (
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Send Friend Request</li>
          <li className="list-group-item">Send Private Message</li>
        </ul>
      );
    }
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-4 no-padding-left">
            <div className="card">
              <div className="card-header group-header">
                {this.props.match.params.user} Profile
              </div>
              <img
                className="width-100"
                src={require("../../../static/images/profile.jpeg")}
              />
              {this.renderProfileLinks()}
            </div>
          </div>
          <div className="col-sm-8 no-padding-left">
            <div className="card">
              <div className="card-header group-header">
                {this.props.match.params.user} Information
              </div>
              <ul className="list-group">
                <li className="list-group-item">
                  <span className="font-weight-bold">Favourite Team:</span>{" "}
                  Dallas Cowboys
                </li>
                <li className="list-group-item">
                  <span className="font-weight-bold">
                    Favourite Player:
                  </span>{" "}
                  Tony Romo
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user
  };
}

export default requireAuth(connect(mapStateToProps, null)(Profile));
