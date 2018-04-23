import React, { Component } from "react";
import { connect } from "react-redux";
import SendPrivateMessage from "../partials/SendPrivateMessage";
import PrivateMessage from "../../sockets/PrivateMessage";
import requireAuth from "../hoc/requireAuth";
import { fetchPrivateMessages } from "../../actions/privateMessages";
import ChatMessage from "../partials/ChatMessage";

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
  displayPrivateMessages() {
    if (this.props.privateMessages.length > 0) {
      return (
        <ul className="list-group list-group-flush line-height-75">
          {this.props.privateMessages.map((message, i) => {
            return <ChatMessage key={i} {...message} />;
          })}
        </ul>
      );
    }
  }
  render() {
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
              {this.displayPrivateMessages()}
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
  return {
    privateMessages: state.privateMessages.privateMessages
  };
}

export default requireAuth(
  connect(mapStateToProps, { fetchPrivateMessages })(PrivateChat)
);
