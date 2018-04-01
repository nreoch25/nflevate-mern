import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchProfile } from "../../actions/profile";
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
  renderProfileLinks() {
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
          <li className="list-group-item">Send Friend Request</li>
          <li className="list-group-item">Send Private Message</li>
        </ul>
      );
    }
  }
  render() {
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
              {this.renderProfileLinks()}
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

export default requireAuth(connect(mapStateToProps, { fetchProfile })(Profile));
