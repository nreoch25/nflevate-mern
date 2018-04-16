import {
  AUTHENTICATION_ERROR,
  AUTHENTICATE_USER,
  UNAUTHENTICATE_USER,
  ONLINE_USERS
} from "../actions/authentication";
import UPDATE_USER from "../actions/profile";

export default (
  state = { authenticated: null, user: null, error: [], onlineUsers: [] },
  action
) => {
  switch (action.type) {
    case AUTHENTICATE_USER:
      return { ...state, authenticated: true, user: action.payload, error: [] };
    case UNAUTHENTICATE_USER:
      return { ...state, authenticated: false, user: null, error: [] };
    case AUTHENTICATION_ERROR:
      return { ...state, error: action.payload };
    case ONLINE_USERS:
      return { ...state, onlineUsers: action.payload };
    case UPDATE_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
