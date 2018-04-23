import axios from "axios";

export const FETCH_PROFILE = "FETCH_PROFILE";
export const SEND_FRIEND_REQUEST = "SEND_FRIEND_REQUEST";
export const UPDATE_PROFILE = "UPDATE_PROFILE";

export function fetchProfile(user) {
  return dispatch => {
    return axios
      .get(`http://localhost:8000/api/profile/${user}`)
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
      .post("http://localhost:8000/api/profile/request", { user, friend })
      .then(response => {
        // display request modal
        window.jQuery("#requestModal").modal("show");
      })
      .catch(error => {
        console.log("ERROR", error);
      });
  };
}

export function cancelFriendRequest(user, cancelUser) {
  return dispatch => {
    return axios
      .post("http://localhost:8000/api/profile/request/cancel", {
        user,
        cancelUser
      })
      .then(response => {
        // display request modal
        window.jQuery("#requestModal").modal("show");
        dispatch({
          type: UPDATE_PROFILE,
          payload: response.data.profile
        });
      })
      .catch(error => {
        console.log("ERROR", error);
      });
  };
}

export function declineFriendRequest(user, cancelUser) {
  return dispatch => {
    return axios
      .post("http://localhost:8000/api/profile/request/decline", {
        user,
        cancelUser
      })
      .then(response => {
        // display request modal
        window.jQuery("#requestModal").modal("show");
        dispatch({
          type: UPDATE_PROFILE,
          payload: response.data.profile
        });
      })
      .catch(error => {
        console.log("ERROR", error);
      });
  };
}

export function acceptFriendRequest(user, acceptUser) {
  return dispatch => {
    return axios
      .post("http://localhost:8000/api/profile/request/accept", {
        user,
        acceptUser
      })
      .then(response => {
        // display request modal
        window.jQuery("#requestModal").modal("show");
        dispatch({
          type: UPDATE_PROFILE,
          payload: response.data.profile
        });
      })
      .catch(error => {
        console.log("ERROR", error);
      });
  };
}
