import { FETCH_GROUPS, GROUP_USERS, GROUP_MESSAGES } from "../actions/groups";

export default (
  state = { groups: [], groupUsers: [], groupMessages: [] },
  action
) => {
  switch (action.type) {
    case FETCH_GROUPS:
      return { ...state, groups: action.payload };
    case GROUP_USERS:
      return { ...state, groupUsers: action.payload };
    case GROUP_MESSAGES:
      return { ...state, groupMessages: action.payload };
    default:
      return state;
  }
};
