import React, { Component } from "react";
import { connect } from "react-redux";

class GroupUsers extends Component {
  constructor(props) {
    super(props);
    this.serverRender = true;
  }
  componentDidMount() {
    this.serverRender = false;
  }
  getGroupUsers() {
    let groupUsers;
    // if server side rendering use the props being passed in
    // else socket IO has been passed new users and that
    // value is updated through the roducer
    if (this.serverRender) {
      groupUsers = this.props.currentUsers;
    } else {
      groupUsers = this.props.groupUsers;
    }
    if (groupUsers.length > 0) {
      return groupUsers.map((user, i) => {
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
