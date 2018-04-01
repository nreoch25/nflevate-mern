import React, { Component } from "react";

class Profile extends Component {
  render() {
    return (
      <div>
        <h1>Profile Page for {this.props.match.params.user}</h1>
      </div>
    );
  }
}

export default Profile;
