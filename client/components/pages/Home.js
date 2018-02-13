import React, { Component } from "react";
import { connect } from "react-redux";
import requireAuth from "../hoc/requireAuth";
import { fetchGroups } from "../../actions/groups.js";

import OnlineUsers from "../partials/OnlineUsers";
import SearchBar from "../partials/SearchBar";
import Card from "../partials/Card";

class Home extends Component {
  componentWillMount() {
    this.props.fetchGroups();
  }
  renderGroups() {
    if (this.props.groups.length > 0) {
      const groups = this.props.groups;
      const chunkSize = 2;
      const chunked = [];
      let index = 0;
      while (index < groups.length) {
        chunked.push(groups.slice(index, index + chunkSize));
        index += chunkSize;
      }
      let groupsArray = chunked.map((chunk, i) => {
        let rowArray = chunk.map((group, i) => {
          return (
            <div key={i} className="col-sm-12 col-md-6 no-padding-left">
              <Card />
            </div>
          );
        });
        return (
          <div key={i} className="row margin-bottom-15">
            {rowArray}
          </div>
        );
      });
      return groupsArray;
    }
    // if (this.props.groups.length > 0) {
    //   // create an array for rows
    //   let rowArray = [];
    //   // create an array for elements within a row
    //   let elementsArray = [];
    //   this.props.groups.map((group, i, { length }) => {
    //     elementsArray.push(
    //       <div className="col-sm-12 col-md-6 no-padding-left">
    //         <Card />
    //       </div>
    //     );
    //     // create the row on even index so that
    //     // both children can be attached to row using createElement
    //     if (i % 2 !== 0) {
    //       // create row and pass in two elements
    //       let groupRow = React.createElement(
    //         "div",
    //         { className: "row margin-bottom-15" },
    //         elementsArray
    //       );
    //       rowArray.push(groupRow);
    //       // clear elements array for next row
    //       elementsArray = [];
    //     }
    //     // if there is an even number of groups we need to
    //     // check if if even number and last element and create row
    //     if (i % 2 === 0 && i + 1 === length) {
    //       let groupRow = React.createElement(
    //         "div",
    //         { className: "row" },
    //         elementsArray
    //       );
    //       rowArray.push(groupRow);
    //     }
    //   });
    //   return rowArray;
    // }
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <form>
              <div className="form-group">
                <SearchBar />
              </div>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-8">{this.renderGroups()}</div>
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

export default requireAuth(connect(mapStateToProps, { fetchGroups })(Home));
