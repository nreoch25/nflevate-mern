import React, { Component } from "react";
import { connect } from "react-redux";
import requireAuth from "../hoc/requireAuth";
import OnlineUsers from "../partials/OnlineUsers";

class Group extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-8">Group Chat</div>
          <div className="col-sm-4">
            <div className="row">
              <OnlineUsers />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default requireAuth(Group);
