import React, { Component } from "react";
import requireAdmin from "../hoc/requireAdmin";

class Admin extends Component {
  render() {
    return (
      <div>
        <h1>NFLevate admin</h1>
      </div>
    );
  }
}

export default requireAdmin(Admin);
