import React, { Component } from "react";
import PropTypes from "prop-types";
import { Field, reduxForm, propTypes } from "redux-form";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import axios from "axios";

const required = value => (value ? undefined : "Required");

class AdminForm extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.state = {
      message: "",
      error: ""
    };
  }
  renderMessage() {
    if (this.state.message !== "") {
      this.groupName.value = "";
      this.fileUpload.files = null;
      this.fileUpload.value = "";
      return <div className="alert alert-success">{this.state.message}</div>;
    }
  }
  handleFormSubmit(evt) {
    evt.preventDefault();
    const data = new FormData();
    data.append("groupName", this.groupName.value);
    data.append("image", this.fileUpload.files[0]);
    fetch("http://localhost:8000/api/group", {
      method: "POST",
      body: data,
      credentials: "include"
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        this.setState({ message: response.message });
      });
  }
  render() {
    return (
      <div className="row vertical-offset-100">
        <div className="col-md-4 col-md-offset-4">
          <div className="panel panel-default box-shadow-panel">
            <div className="panel-heading">
              <h3 className="panel-title text-center">Admin Form</h3>
            </div>
            <div className="panel-body">
              <form onSubmit={this.handleFormSubmit}>
                <div className="form-group">
                  <label>Group Name:</label>
                  <input
                    ref={ref => {
                      this.groupName = ref;
                    }}
                    className="form-control"
                    type="input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Upload Group Image:</label>
                  <input
                    ref={ref => {
                      this.fileUpload = ref;
                    }}
                    className="form-control"
                    type="file"
                    required
                  />
                </div>
                {this.renderMessage()}
                <button
                  type="submit"
                  className="btn btn-lg btn-success btn-block"
                >
                  Add Group
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminForm;
