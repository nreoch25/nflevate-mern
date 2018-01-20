import React, { Component } from "react";
import PropTypes from "prop-types";
import { Field, reduxForm, propTypes } from "redux-form";
import { withRouter } from "react-router";
import { connect } from "react-redux";

const required = value => (value ? undefined : "Required");

class AdminForm extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  handleFormSubmit(evt) {
    evt.preventDefault();
    console.log("GroupName", this.groupName.value);
    console.log("FileUpload", this.fileUpload.files);
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
