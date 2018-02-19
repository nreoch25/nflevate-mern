import React, { Component } from "react";
import { connect } from "react-redux";
import requireAuth from "../hoc/requireAuth";
import OnlineUsers from "../partials/OnlineUsers";

class Group extends Component {
  getGroupName() {
    if (this.props.groups.length > 0) {
      const { name } = this.props.match.params;
      const groupName = this.props.groups.find(group => {
        const groupName = group.name.replace(/ /g, "").toLowerCase();
        if (groupName === name) {
          return true;
        }
      });
      return groupName.name;
    }
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-8 no-padding-left">
            <div className="card">
              <div className="card-header group-header">
                {this.getGroupName()}
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Cras justo odio</li>
                <li className="list-group-item">Dapibus ac facilisis in</li>
                <li className="list-group-item">Vestibulum at eros</li>
              </ul>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="row">
              <OnlineUsers />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    groups: state.groups.groups
  };
}

export default requireAuth(connect(mapStateToProps, null)(Group));
