import React, { Component } from "react";

class Card extends Component {
  render() {
    return (
      <div className="col-sm-6 no-padding-left">
        <div className="card">
          <a
            className="img-card"
            href="http://www.fostrap.com/2016/03/bootstrap-3-carousel-fade-effect.html"
          >
            <img src="https://1.bp.blogspot.com/-Bii3S69BdjQ/VtdOpIi4aoI/AAAAAAAABlk/F0z23Yr59f0/s640/cover.jpg" />
          </a>
          <div className="card-content">
            <h4 className="card-title">
              <a href="http://www.fostrap.com/2016/03/bootstrap-3-carousel-fade-effect.html">
                {" "}
                Bootstrap 3 Carousel FadeIn Out Effect
              </a>
            </h4>
            <p className="">
              Tutorial to make a carousel bootstrap by adding more wonderful
              effect fadein ...
            </p>
          </div>
          <div className="card-read-more">
            <a
              href="http://www.fostrap.com/2016/03/bootstrap-3-carousel-fade-effect.html"
              className="btn btn-link btn-block"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
