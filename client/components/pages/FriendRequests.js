import React, { Component } from "react";
import { connect } from "react-redux";
import requireAuth from "../hoc/requireAuth";

class FriendRequests extends Component {
  displayFriendRequests() {
    console.log("USER", this.props.user);
    if (this.props.user.requests.length > 0) {
      return this.props.user.requests.map((request, i) => {
        return (
          <li key={i} className="list-group-item">
            <img
              src={require("../../../static/images/default.png")}
              className="rounded-circle width-10-percent border border-primary float-left"
            />
            <div className="float-left width-90-percent">
              <div className="padding-left-10 padding-right-10">
                <h6 className="float-left margin-right-10">{request}</h6>
                <button type="button" className="btn btn-success margin-right-10">Accept</button>
                <button type="button" className="btn btn-danger">Decline</button>
              </div>
            </div>
          </li>
        );
      });
    }
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-8 no-padding-left">
            <div className="card">
              <div className="card-header group-header">
                Friend Requests - {this.props.match.params.user}
              </div>
              <ul className="list-group list-group-flush line-height-75">
                {this.displayFriendRequests()}
              </ul>
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

function mapStateToProps(state) {
  return {
    user: state.auth.user
  };
}

export default requireAuth(connect(mapStateToProps, null)(FriendRequests));
