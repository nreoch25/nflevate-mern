import React, { Component } from "react";
import PropTypes from "prop-types";
import { Field, reduxForm, propTypes } from "redux-form";
//import { withRouter } from "react-router";
//import { connect } from "react-redux";
//import { loginUser } from "../../actions/authentication";

const required = value => (value ? undefined : "Required");

class LoginForm extends Component {
  // static propTypes = {
  //   ...propTypes,
  //   loginUser: PropTypes.func,
  //   errorMessage: PropTypes.string
  // };

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">{this.props.errorMessage}</div>
      );
    }
  }
  handleFormSubmit = values => {
    console.log("SUBMIT");
    //this.props.loginUser(values, this.props.history);
  };
  renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
      <label>{label}</label>
      <div className="form-group">
        <input className="form-control" {...input} type={type} />
      </div>
      {touched &&
        (error && (
          <div className="alert alert-danger p-1">
            <small>{error}</small>
          </div>
        ))}
    </div>
  );
  render() {
    return (
      <div className="row vertical-offset-100">
        <div className="col-md-4 col-md-offset-4">
          <div className="panel panel-default box-shadow-panel">
            <div className="panel-heading">
              <h3 className="panel-title text-center">Please Sign in</h3>
            </div>
            <div className="panel-body">
              <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
                <Field
                  name="email"
                  component={this.renderField}
                  label="Email:"
                  type="text"
                  className="form-control"
                  validate={[required]}
                />
                <Field
                  name="password"
                  component={this.renderField}
                  label="Password:"
                  type="password"
                  className="form-control"
                  validate={[required]}
                />
                {this.renderAlert()}
                <button
                  type="submit"
                  className="btn btn-lg btn-success btn-block"
                >
                  Login
                </button>
                <a
                  style={{ marginTop: "10px" }}
                  href="/auth/google"
                  className="btn-social btn-gplus btn-lg btn-block text-center"
                >
                  <i className="fa fa-google-plus" /> Login with Google
                </a>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LoginForm = reduxForm({
  form: "login"
})(LoginForm);

export default LoginForm;
