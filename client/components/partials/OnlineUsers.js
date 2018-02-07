import React, { Component } from "react";
import { connect } from "react-redux";

class OnlineUsers extends Component {
  getOnlineUsers() {
    if (this.props.onlineUsers.length > 0) {
      return this.props.onlineUsers.map(user => {
        return (
          <li key={user._id} className="list-group-item">
            <i className="fa fa-circle online" aria-hidden="true" />
            {user.username}
          </li>
        );
      });
    }
  }
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading lead">Online Users</div>
        <div className="panel-body" style={{ padding: "0 15px" }}>
          <ul className="list-group">{this.getOnlineUsers()}</ul>
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
