import { FETCH_GROUPS } from "../actions/groups";

export default (state = { groups: [] }, action) => {
  switch (action.type) {
    case FETCH_GROUPS:
      return { ...state, groups: action.payload };
    default:
      return state;
  }
};
