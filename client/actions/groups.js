import axios from "axios";

export const FETCH_GROUPS = "FETCH_GROUPS";

export function fetchGroups() {
  return dispatch => {
    axios
      .get("http://localhost:8000/api/group")
      .then(response => {
        console.log("NFLevate groups", response.data);
        dispatch({
          type: FETCH_GROUPS,
          payload: response.data.groups
        });
      })
      .catch(error => {
        console.log("Request failed", error.response.data.error);
      });
  };
}
