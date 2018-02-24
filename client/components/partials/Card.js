import React from "react";
import { Link } from "react-router-dom";

const Card = props => {
  let groupImage = require(`../../../static/upload/${props.image}`);
  return (
    <div className="card">
      <img className="card-img-top" src={groupImage} alt="Card image cap" />
      <div className="card-body">
        <h5 className="card-title">{props.name}</h5>
        <Link
          to={`/group/${props.name.replace(/ /g, "").toLowerCase()}`}
          className="btn btn-primary"
        >
          Enter Group
        </Link>
      </div>
    </div>
  );
};

export default Card;
