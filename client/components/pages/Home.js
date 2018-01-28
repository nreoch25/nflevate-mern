import React, { Component } from "react";
import requireAuth from "../hoc/requireAuth";

class Home extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12" style={{ backgroundColor: "#ffffff" }}>
            Search Bar
          </div>
        </div>
        <div className="row">
          <div className="col-sm-8" style={{ backgroundColor: "#000000" }}>
            <div className="row">
              <div className="col-sm-6" style={{ backgroundColor: "#ffffff" }}>
                col1
              </div>
              <div className="col-sm-6" style={{ backgroundColor: "#0000000" }}>
                col2
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6" style={{ backgroundColor: "#000" }}>
                col1
              </div>
              <div className="col-sm-6" style={{ backgroundColor: "#fff" }}>
                col2
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6" style={{ backgroundColor: "#fff" }}>
                col1
              </div>
              <div className="col-sm-6" style={{ backgroundColor: "#000" }}>
                col2
              </div>
            </div>
          </div>
          <div className="col-sm-4" style={{ backgroundColor: "#ffffff" }}>
            col4
          </div>
        </div>
      </div>
    );
  }
}

export default requireAuth(Home);
