import React from "react";
import moment from "moment";

const ChatMessage = ({ _id, sender, createdAt, body }) => {
  const timestamp = moment(createdAt);
  return (
    <li className="list-group-item">
      <img
        src={require("../../../static/images/default.png")}
        className="rounded-circle width-10-percent border border-primary float-left"
      />
      <div className="float-left width-90-percent">
        <div className="padding-left-10 padding-right-10">
          <h6 className="float-left">{sender}</h6>
          <p className="float-right">{timestamp.calendar()}</p>
        </div>
        <p className="padding-left-10 clear-both line-height-125">{body}</p>
      </div>
    </li>
  );
};

export default ChatMessage;
