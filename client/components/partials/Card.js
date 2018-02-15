import React from "react";

const Card = props => {
  let groupImage = require(`../../../static/upload/${props.image}`);
  return (
    <div className="card">
      <img className="card-img-top" src={groupImage} alt="Card image cap" />
      <div className="card-body">
        <h5 className="card-title">{props.name}</h5>
        <a href="#" className="btn btn-primary">
          Enter Group
        </a>
      </div>
    </div>
  );
};

export default Card;
