import React, { Component } from "react";
import GroupMessage from "../../sockets/GroupMessage";

class SendChatMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMessage: ""
    };
  }
  onMessageFormChange = evt => {
    this.setState({ chatMessage: evt.target.value });
  };
  onChatMessageSubmit = evt => {
    evt.preventDefault();
    GroupMessage.sendMessage({
      name: this.props.user.username,
      group: this.props.group,
      body: this.state.chatMessage
    });
  };
  render() {
    return (
      <footer className="chat-footer-send">
        <div className="container">
          <div className="input-group chat-message">
            <input
              onChange={this.onMessageFormChange}
              className="form-control chat-input"
            />
            <span className="input-group-btn">
              <button onClick={this.onChatMessageSubmit} className="chat-btn">
                Send Message
              </button>
            </span>
          </div>
        </div>
      </footer>
    );
  }
}

export default SendChatMessage;
