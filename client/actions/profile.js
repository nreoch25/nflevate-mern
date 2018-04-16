import axios from "axios";

export const FETCH_PROFILE = "FETCH_PROFILE";
export const SEND_FRIEND_REQUEST = "SEND_FRIEND_REQUEST";

export function fetchProfile(user) {
  return dispatch => {
    return axios
      .get(`/api/profile/${user}`)
      .then(response => {
        dispatch({
          type: FETCH_PROFILE,
          payload: response.data.profile
        });
      })
      .catch(error => {
        console.log("Request failed", error.response.data.error);
      });
  };
}

export function sendFriendRequest(user, friend) {
  return dispatch => {
    return axios
      .post("/api/profile/request", { user, friend })
      .then(response => {
        console.log("SENT FRIEND REQUEST", response.data);
      })
      .catch(error => {
        console.log("ERROR", error);
      });
  };
}
