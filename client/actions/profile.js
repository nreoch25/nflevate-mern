import axios from "axios";
import config from "../../server/config";

export const FETCH_PROFILE = "FETCH_PROFILE";

export function fetchProfile(user) {
  return dispatch => {
    return axios
      .get(`${config.API_HOST}/api/profile/${user}`)
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
