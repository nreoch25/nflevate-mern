import axios from "axios";

export const FETCH_GROUPS = "FETCH_GROUPS";

export function fetchGroups() {
  console.log("HERE");
  return dispatch => {
    axios
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
  console.log("VAL", val);
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
