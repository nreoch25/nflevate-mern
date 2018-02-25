import { FETCH_GROUPS, GROUP_USERS } from "../actions/groups";

export default (state = { groups: [], groupUsers: [] }, action) => {
  switch (action.type) {
    case FETCH_GROUPS:
      return { ...state, groups: action.payload };
    case GROUP_USERS:
      return { ...state, groupUsers: action.payload };
    default:
      return state;
  }
};
