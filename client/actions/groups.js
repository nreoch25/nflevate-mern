import axios from "axios";

export const FETCH_GROUPS = "FETCH_GROUPS";
export const GROUP_MESSAGES = "GROUP_MESSAGES";
export const GROUP_USERS = "GROUP_USERS";

export function fetchGroups(host) {
  // Need host because this is a server side call
  // on the server call it was the whole url
  return dispatch => {
    return axios
      .get(`${host}/api/group`)
      .then(response => {
        dispatch({
          type: FETCH_GROUPS,
          payload: response.data.groups
        });
      })
      .catch(error => {
        console.log("Request failed", error);
      });
  };
}

export function fetchGroupMessages(groupName) {
  return dispatch => {
    return axios
      .post("/api/group/messages", { groupName })
      .then(response => {
        dispatch({
          type: GROUP_MESSAGES,
          payload: response.data.groupMessages
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
      .get("/api/group")
      .then(response => {
        let filteredGroups = response.data.groups.filter(group =>
          group.name.includes(val)
        );
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
