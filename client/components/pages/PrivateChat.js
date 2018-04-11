import React, { Component } from "react";
import { connect } from "react-redux";
import SendPrivateMessage from "../partials/SendPrivateMessage";
import PrivateMessage from "../../sockets/PrivateMessage";
import requireAuth from "../hoc/requireAuth";
import { fetchPrivateMessages } from "../../actions/privateMessages";

class PrivateChat extends Component {
  constructor(props) {
    super(props);
    this.params = {};
  }
  componentDidMount() {
    // join user to group on backend
    this.params = {
      sender: this.props.match.params.sender,
      receiver: this.props.match.params.receiver
    };
    PrivateMessage.joinPrivateChat(this.params);
    this.props.fetchPrivateMessages(this.params);
  }
  componentWillUnmount() {
    PrivateMessage.leavePrivateChat(this.params);
  }
  render() {
    console.log("PRIVATE MESSAGES", this.props.privateMessages);
    const userObject = {
      sender: this.props.match.params.sender,
      receiver: this.props.match.params.receiver
    };
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-8 no-padding-left">
            <div className="card">
              <div className="card-header group-header">
                Private Chat - {userObject.sender} and {userObject.receiver}{" "}
              </div>
              <div className="chat-message-placeholder" />
            </div>
          </div>
          <div className="col-sm-4">
            <div className="row">
              <SendPrivateMessage {...userObject} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log("STATE", state);
  return {
    privateMessages: state.privateMessages.privateMessages
  };
}

export default requireAuth(
  connect(mapStateToProps, { fetchPrivateMessages })(PrivateChat)
);
