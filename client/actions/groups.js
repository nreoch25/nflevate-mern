import axios from "axios";

export const FETCH_GROUPS = "FETCH_GROUPS";
export const GROUP_USERS = "GROUP_USERS";

export function fetchGroups() {
  return dispatch => {
    return axios
      .get("http://localhost:8000/api/group")
      .then(response => {
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

export function filterGroups(val) {
  return dispatch => {
    axios
      .get("http://localhost:8000/api/group")
      .then(response => {
        let filteredGroups = response.data.groups.filter(group =>
          group.name.includes(val)
        );
        console.log(filteredGroups);
        dispatch({
          type: FETCH_GROUPS,
          payload: filteredGroups
        });
      })
      .catch(error => {
        console.log("Request failed", error.response.data.error);
      });
  };
}
