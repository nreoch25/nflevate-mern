import {
  AUTHENTICATION_ERROR,
  AUTHENTICATE_USER
} from "../actions/authentication";

export default (
  state = { authenticated: false, user: {}, error: [] },
  action
) => {
  switch (action.type) {
    case AUTHENTICATE_USER:
      return { ...state, authenticated: true, user: action.payload, error: [] };
    case AUTHENTICATION_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
