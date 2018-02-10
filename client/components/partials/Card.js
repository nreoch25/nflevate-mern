import React, { Component } from "react";

class Card extends Component {
  render() {
    return (
      <div className="card">
        <img
          className="card-img-top"
          src="https://incomebully.com/wp-content/uploads/2015/08/show-me-the-money-286x180.jpg"
          alt="Card image cap"
        />
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <a href="#" className="btn btn-primary">
            Go somewhere
          </a>
        </div>
      </div>
    );
  }
}

export default Card;
