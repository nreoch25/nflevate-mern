import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchProfile,
  sendFriendRequest,
  cancelFriendRequest
} from "../../actions/profile";
import requireAuth from "../hoc/requireAuth";
import ProfileInformation from "../partials/profile/ProfileInformation";
import ProfileUpdate from "../partials/profile/ProfileUpdate";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "display"
    };
  }
  componentDidMount() {
    this.props.fetchProfile(this.props.match.params.user);
  }
  displayProfileContent(profileInfo) {
    if (this.state.mode === "display") {
      return <ProfileInformation {...profileInfo} />;
    } else {
      return <ProfileUpdate />;
    }
  }
  toggleProfileMode = () => {
    let mode = this.state.mode === "display" ? "update" : "display";
    this.setState({ mode });
  };
  sendFriendRequest(username, friend) {
    this.props.sendFriendRequest(username, friend);
  }
  renderProfileLinks({ username }) {
    if (this.props.user.username === this.props.match.params.user) {
      return (
        <ul className="list-group list-group-flush">
          <li
            className="list-group-item toggle-profile"
            onClick={this.toggleProfileMode}
          >
            Update Profile Information
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="list-group list-group-flush">
          <li
            onClick={this.sendFriendRequest.bind(
              this,
              this.props.user.username,
              username
            )}
            className="list-group-item cursor-pointer profile-link"
          >
            Send Friend Request
          </li>
          <Link
            className="remove-underline"
            to={`/private/${this.props.user.username}/${username}`}
          >
            <li className="list-group-item">Send Private Message</li>
          </Link>
        </ul>
      );
    }
  }
  cancelFriendRequest(cancelUser) {
    this.props.cancelFriendRequest(this.props.user.username, cancelUser);
  }
  renderSentRequests() {
    if (this.props.user.sentRequests.length === 0) {
      return (
        <div className="card rounded-0 border-top-0">
          <div className="card-header">Sent Friend Requests</div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item padding-left-2rem disabled">
              No Sent Friend Requests
            </li>
          </ul>
        </div>
      );
    }
    return (
      <div className="card rounded-0 border-top-0">
        <div className="card-header">Sent Friend Requests</div>
        <ul className="list-group list-group-flush">
          {this.props.user.sentRequests.map((sent, i) => {
            return (
              <li key={i} className="list-group-item padding-left-2rem">
                {sent}
                <button
                  type="button"
                  className="btn btn-danger float-right line-height-75"
                  onClick={this.cancelFriendRequest.bind(this, sent)}
                >
                  Cancel
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
  render() {
    console.log("PROFILE", this.props.profile);
    const profileInfo = {
      username: this.props.match.params.user,
      favouriteTeam: this.props.profile.favouriteTeam,
      favouritePlayer: this.props.profile.favouritePlayer
    };
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
              {this.renderProfileLinks(profileInfo)}
              {this.renderSentRequests()}
            </div>
          </div>
          <div className="col-sm-8 no-padding-left">
            {this.displayProfileContent(profileInfo)}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    profile: state.profile.profile
  };
}

export default requireAuth(
  connect(mapStateToProps, {
    sendFriendRequest,
    fetchProfile,
    cancelFriendRequest
  })(Profile)
);
