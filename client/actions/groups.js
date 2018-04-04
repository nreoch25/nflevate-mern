import axios from "axios";
import config from "../../server/config";

export const FETCH_GROUPS = "FETCH_GROUPS";
export const GROUP_MESSAGES = "GROUP_MESSAGES";
export const GROUP_USERS = "GROUP_USERS";

export function fetchGroups() {
  return dispatch => {
    return axios
      .get(`${config.API_HOST}/api/group`)
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

export function fetchGroupMessages(groupName) {
  return dispatch => {
    return axios
      .post(`${config.API_HOST}/api/group/messages`, { groupName })
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
      .get(`${config.API_HOST}/api/group`)
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
