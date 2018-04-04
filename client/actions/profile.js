import axios from "axios";

export const FETCH_PROFILE = "FETCH_PROFILE";

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
        console.log("HERE - FETCH PROFILE");
        console.log("Request failed", error.response.data.error);
      });
  };
}