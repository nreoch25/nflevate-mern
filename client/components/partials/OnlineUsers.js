import React, { Component } from "react";
import { connect } from "react-redux";

class OnlineUsers extends Component {
  getOnlineUsers() {
    console.log("ONLINE USERS", this.props);
    return (
      <li className="list-group-item">
        <i className="fa fa-circle online" aria-hidden="true" />
        Online Users Here
      </li>
    );
  }
  render() {
    return (
      <div className="card width-100">
        <div className="card-header remove-border-bottom">
          <h3 className="card-title margin-bottom-0">Online Users</h3>
        </div>
        <div className="card-body">
          <div className="card-text">
            <ul className="list-group">{this.getOnlineUsers()}</ul>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    onlineUsers: state.auth.onlineUsers
  };
}

export default connect(mapStateToProps, null)(OnlineUsers);
