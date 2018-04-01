import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchOnlineUsers } from "../../actions/authentication";

class OnlineUsers extends Component {
  componentDidMount() {
    this.props.fetchOnlineUsers();
  }
  getOnlineUsers() {
    if (this.props.onlineUsers.length > 0) {
      return this.props.onlineUsers.map(user => {
        return (
          <li key={user._id} className="list-group-item">
            <Link className="remove-underline" to={`/profile/${user.username}`}>
              <i className="fa fa-circle online" aria-hidden="true" />
              {user.username}
            </Link>
          </li>
        );
      });
    }
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
  return {
    onlineUsers: state.auth.onlineUsers
  };
}

export default connect(mapStateToProps, { fetchOnlineUsers })(OnlineUsers);
