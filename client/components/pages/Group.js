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
              <ul className="list-group list-group-flush line-height-75">
                <li className="list-group-item">
                  <img
                    src={require("../../../static/images/default.png")}
                    className="rounded-circle width-10-percent border border-primary float-left"
                  />
                  <div className="float-left width-90-percent">
                    <div className="padding-left-10 padding-right-10">
                      <h6 className="float-left">User Name</h6>
                      <p className="float-right">12 hours ago</p>
                    </div>
                    <p className="padding-left-10 clear-both line-height-125">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                </li>
                <li className="list-group-item">
                  <img
                    src={require("../../../static/images/default.png")}
                    className="rounded-circle width-10-percent border border-primary float-right"
                  />
                  <div className="float-right width-90-percent">
                    <div className="padding-left-10 padding-right-10">
                      <h6 className="float-right">User Name</h6>
                      <p className="float-left">12 hours ago</p>
                    </div>
                    <p className="padding-right-10 clear-both line-height-125">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                </li>
                <li className="list-group-item">
                  <img
                    src={require("../../../static/images/default.png")}
                    className="rounded-circle width-10-percent border border-primary float-left"
                  />
                  <div className="float-left width-90-percent">
                    <div className="padding-left-10 padding-right-10">
                      <h6 className="float-left">User Name</h6>
                      <p className="float-right">12 hours ago</p>
                    </div>
                    <p className="padding-left-10 clear-both line-height-125">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                </li>
                <li className="list-group-item">
                  <img
                    src={require("../../../static/images/default.png")}
                    className="rounded-circle width-10-percent border border-primary float-right"
                  />
                  <div className="float-right width-90-percent">
                    <div className="padding-left-10 padding-right-10">
                      <h6 className="float-right">User Name</h6>
                      <p className="float-left">12 hours ago</p>
                    </div>
                    <p className="padding-right-10 clear-both line-height-125">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                </li>
                <li className="list-group-item">
                  <img
                    src={require("../../../static/images/default.png")}
                    className="rounded-circle width-10-percent border border-primary float-left"
                  />
                  <div className="float-left width-90-percent">
                    <div className="padding-left-10 padding-right-10">
                      <h6 className="float-left">User Name</h6>
                      <p className="float-right">12 hours ago</p>
                    </div>
                    <p className="padding-left-10 clear-both line-height-125">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                </li>
                <li className="list-group-item">
                  <img
                    src={require("../../../static/images/default.png")}
                    className="rounded-circle width-10-percent border border-primary float-right"
                  />
                  <div className="float-right width-90-percent">
                    <div className="padding-left-10 padding-right-10">
                      <h6 className="float-right">User Name</h6>
                      <p className="float-left">12 hours ago</p>
                    </div>
                    <p className="padding-right-10 clear-both line-height-125">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                </li>
                <li className="list-group-item">
                  <img
                    src={require("../../../static/images/default.png")}
                    className="rounded-circle width-10-percent border border-primary float-left"
                  />
                  <div className="float-left width-90-percent">
                    <div className="padding-left-10 padding-right-10">
                      <h6 className="float-left">User Name</h6>
                      <p className="float-right">12 hours ago</p>
                    </div>
                    <p className="padding-left-10 clear-both line-height-125">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                </li>
                <li className="list-group-item">
                  <img
                    src={require("../../../static/images/default.png")}
                    className="rounded-circle width-10-percent border border-primary float-right"
                  />
                  <div className="float-right width-90-percent">
                    <div className="padding-left-10 padding-right-10">
                      <h6 className="float-right">User Name</h6>
                      <p className="float-left">12 hours ago</p>
                    </div>
                    <p className="padding-right-10 clear-both line-height-125">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                </li>
              </ul>
              <div className="chat-message-placeholder" />
            </div>
          </div>
          <div className="col-sm-4">
            <div className="row">
              <OnlineUsers />
            </div>
          </div>
        </div>
        <footer className="chat-footer-send">
          <div className="container">
            <div className="input-group chat-message">
              <input className="form-control chat-input" />
              <span className="input-group-btn">
                <button className="chat-btn">Send Message</button>
              </span>
            </div>
          </div>
        </footer>
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
