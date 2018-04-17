import React, { Component } from "react";
import requireAuth from "../hoc/requireAuth";
import { fetchPlayerNews } from "../../actions/news";

class PlayerNews extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchPlayerNews();
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-8 no-padding-left">
            <div className="card">
              <div className="card-header group-header">Player News</div>
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

export default requireAuth(PlayerNews);
