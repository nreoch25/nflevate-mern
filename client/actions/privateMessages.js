import axios from "axios";
export const FETCH_PRIVATE_MESSAGES = "FETCH_PRIVATE_MESSAGES";

export function fetchPrivateMessages({ sender, receiver }) {
  return dispatch => {
    return axios
      .post("/api/private/messages", { sender, receiver })
      .then(response => {
        console.log("PRIVATE MESSAGE ACTIONS", response.data);
        dispatch({
          type: FETCH_PRIVATE_MESSAGES,
          payload: response.data
        });
      })
      .catch(error => {
        console.log("Request failed", error.response.data.error);
      });
  };
}
