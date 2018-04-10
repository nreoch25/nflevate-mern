import React, { Component } from "react";
import PrivateMessage from "../../sockets/PrivateMessage";

class SendPrivateMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      privateMessage: ""
    };
  }
  onMessageFormChange = evt => {
    this.setState({ privateMessage: evt.target.value });
  };
  onPrivateMessageSubmit = evt => {
    evt.preventDefault();
    PrivateMessage.sendMessage(
      {
        sender: this.props.sender,
        receiver: this.props.receiver,
        body: this.state.privateMessage
      },
      () => {
        this.privateMessage.value = "";
      }
    );
  };
  render() {
    return (
      <footer className="chat-footer-send">
        <div className="container">
          <div className="input-group chat-message">
            <input
              onChange={this.onMessageFormChange}
              className="form-control chat-input"
              ref={ref => {
                this.privateMessage = ref;
              }}
            />
            <span className="input-group-btn">
              <button
                onClick={this.onPrivateMessageSubmit}
                className="chat-btn"
              >
                Send Message
              </button>
            </span>
          </div>
        </div>
      </footer>
    );
  }
}

export default SendPrivateMessage;
