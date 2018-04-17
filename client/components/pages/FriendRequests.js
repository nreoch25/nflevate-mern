import React, { Component } from "react";
import { connect } from "react-redux";
import requireAuth from "../hoc/requireAuth";
import { fetchProfile, declineFriendRequest } from "../../actions/profile";

class FriendRequests extends Component {
  componentDidMount() {
    this.props.fetchProfile(this.props.match.params.user);
  }
  declineFriendRequest(cancelUser) {
    this.props.declineFriendRequest(this.props.profile.username, cancelUser);
  }
  displayFriendRequests() {
    if (typeof this.props.profile.requests !== "undefined") {
      if (this.props.profile.requests.length > 0) {
        return this.props.profile.requests.map((request, i) => {
          return (
            <li key={i} className="list-group-item">
              <img
                src={require("../../../static/images/default.png")}
                className="rounded-circle width-10-percent border border-primary float-left"
              />
              <div className="float-left width-90-percent">
                <div className="padding-left-10 padding-right-10">
                  <h6 className="float-left margin-right-10">{request}</h6>
                  <button
                    type="button"
                    className="btn btn-success margin-right-10"
                  >
                    Accept
                  </button>
                  <button
                    onClick={this.declineFriendRequest.bind(this, request)}
                    type="button"
                    className="btn btn-danger"
                  >
                    Decline
                  </button>
                </div>
              </div>
            </li>
          );
        });
      }
    }
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-8 no-padding-left">
            <div className="card">
              <div className="card-header group-header">
                Friend Requests - {this.props.match.params.user}
              </div>
              <ul className="list-group list-group-flush line-height-75">
                {this.displayFriendRequests()}
              </ul>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="row" />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: state.profile.profile
  };
}

export default requireAuth(
  connect(mapStateToProps, { fetchProfile, declineFriendRequest })(
    FriendRequests
  )
);
