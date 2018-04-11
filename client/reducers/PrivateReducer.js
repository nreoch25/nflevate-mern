import { FETCH_PRIVATE_MESSAGES } from "../actions/privateMessages";

export default (state = { privateMessages: [] }, action) => {
  switch (action.type) {
    case FETCH_PRIVATE_MESSAGES:
      return { ...state, privateMessages: action.payload };
    default:
      return state;
  }
};
