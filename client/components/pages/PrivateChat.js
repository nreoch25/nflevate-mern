import React, { Component } from "react";
import SendPrivateMessage from "../partials/SendPrivateMessage";
import requireAuth from "../hoc/requireAuth";

class PrivateChat extends Component {
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

export default requireAuth(PrivateChat);
