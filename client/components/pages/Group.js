import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import requireAuth from "../hoc/requireAuth";
import GroupUsers from "../partials/GroupUsers";
import SendChatMessage from "../partials/SendChatMessage";
import GroupMessage from "../../sockets/GroupMessage";
import { fetchGroupMessages } from "../../actions/groups";
import ChatMessage from "../partials/ChatMessage";

class Group extends Component {
  constructor(props) {
    super(props);
    this.groupName = "";
    this.currentUsers = [];
    this.params = {};
  }
  componentDidMount() {
    // join user to group on backend
    this.params = { name: this.props.user.username, group: this.groupName };
    GroupMessage.joinGroup(this.params);
    this.props.fetchGroupMessages(this.groupName);
  }
  componentWillUnmount() {
    GroupMessage.leaveGroup(this.params);
  }
  getGroupName() {
    if (this.props.groups.length > 0) {
      const { name } = this.props.match.params;
      const groupName = this.props.groups.find(group => {
        const groupName = group.name.replace(/ /g, "").toLowerCase();
        if (groupName === name) {
          return true;
        }
      });
      this.groupName = groupName.name;
      // Allows for currentUsers to be accessed from the
      // server side rendering and load group currentUsers
      // on initial load from the server side rendering
      this.currentUsers = groupName.currentUsers;
      return this.groupName;
    }
  }
  displayChatMessages() {
    if (this.props.groupMessages.length > 0) {
      return (
        <ul className="list-group list-group-flush line-height-75">
          {this.props.groupMessages.map((message, i) => {
            return <ChatMessage key={i} {...message} />;
          })}
        </ul>
      );
    }
  }
  render() {
    let groupName = this.getGroupName();
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-8 no-padding-left">
            <div className="card">
              <div className="card-header group-header">{groupName}</div>
              {this.displayChatMessages()}
              <div className="chat-message-placeholder" />
            </div>
          </div>
          <div className="col-sm-4">
            <div className="row">
              <GroupUsers currentUsers={this.currentUsers} />
            </div>
          </div>
        </div>
        <SendChatMessage user={this.props.user} group={this.groupName} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    groups: state.groups.groups,
    groupMessages: state.groups.groupMessages,
    user: state.auth.user
  };
}

export default requireAuth(
  connect(mapStateToProps, { fetchGroupMessages })(Group)
);
