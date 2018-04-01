import { FETCH_PROFILE } from "../actions/profile";

export default (state = { profile: {} }, action) => {
  switch (action.type) {
    case FETCH_PROFILE:
      return { ...state, profile: action.payload };
    default:
      return state;
  }
};
