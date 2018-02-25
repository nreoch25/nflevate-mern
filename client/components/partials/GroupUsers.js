import React, { Component } from "react";
import { connect } from "react-redux";

class GroupUsers extends Component {
  getGroupUsers() {
    if (this.props.groupUsers.length > 0) {
      return this.props.groupUsers.map((user, i) => {
        return (
          <li key={i} className="list-group-item">
            <i className="fa fa-circle online" aria-hidden="true" />
            {user}
          </li>
        );
      });
    }
  }
  render() {
    return (
      <div className="card width-100">
        <div className="card-header remove-border-bottom">
          <h3 className="card-title margin-bottom-0">Group Users</h3>
        </div>
        <div className="card-body">
          <div className="card-text">
            <ul className="list-group">{this.getGroupUsers()}</ul>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    groupUsers: state.groups.groupUsers
  };
}

export default connect(mapStateToProps, null)(GroupUsers);
