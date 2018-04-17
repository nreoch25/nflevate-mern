import React, { Component } from "react";
import requireAuth from "../hoc/requireAuth";

class Articles extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-8 no-padding-left">
            <div className="card">
              <div className="card-header group-header">Articles</div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="row" />
          </div>
        </div>
      </div>
    );
  }
}

export default requireAuth(Articles);
