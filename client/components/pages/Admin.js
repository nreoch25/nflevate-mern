import React, { Component } from "react";
import AdminForm from "../auth/AdminForm";
import requireAdmin from "../hoc/requireAdmin";

class Admin extends Component {
  render() {
    return (
      <div className="container">
        <AdminForm />
      </div>
    );
  }
}

export default requireAdmin(Admin);
