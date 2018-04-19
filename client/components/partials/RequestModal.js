import React, { Component } from "react";

class RequestModal extends Component {
  render() {
    return (
      <div className="modal fade" id="requestModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">{this.props.message}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RequestModal;
