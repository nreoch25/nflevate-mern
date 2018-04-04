import axios from "axios";
import SocketIO from "../sockets/SocketIO";
import config from "../../server/config";

export const AUTHENTICATE_USER = "AUTHENTICATE_USER";
export const UNAUTHENTICATE_USER = "UNAUTHENTICATE_USER";
export const AUTHENTICATION_ERROR = "AUTHENTICATION_ERROR";
export const ONLINE_USERS = "ONLINE_USERS";

export function signupUser({ username, email, password }, history) {
  return dispatch => {
    axios
      .post(`${config.API_HOST}/auth/signup`, { username, email, password })
      .then(response => {
        console.log("Successful Signup", response.data.user);

        dispatch({
          type: AUTHENTICATE_USER,
          payload: response.data.user
        });
        history.push("/home");
      })
      .catch(error => {
        console.log("Failed Signup", error.response.data.error);
        dispatch(authError(error.response.data.error));
      });
  };
}

export function loginUser({ email, password }, history) {
  return dispatch => {
    axios
      .post(`${config.API_HOST}/auth/login`, { email, password })
      .then(response => {
        console.log("Successful Login", response.data.user);

        dispatch({
          type: AUTHENTICATE_USER,
          payload: response.data.user
        });
        history.push("/home");
      })
      .catch(error => {
        console.log("Failed Login", error.response.data.error);
        dispatch(authError(error.response.data.error));
      });
  };
}

export function logoutUser(history) {
  return dispatch => {
    axios.post(`${config.API_HOST}/auth/logout`).then(() => {
      // disconnect socketIO
      SocketIO.disconnect();

      dispatch({
        type: UNAUTHENTICATE_USER
      });
      history.push("/");
    });
  };
}

export function authError(error) {
  return {
    type: AUTHENTICATION_ERROR,
    payload: error
  };
}

export function currentUser() {
  console.log("GET CURRENT USER - authentication actions");
  return dispatch => {
    axios.post(`${config.API_HOST}/auth/user`).then(response => {
      const user = response.data.user;
      if (user) {
        console.log("USER - authentication actions", user);
        // initiate socket.io only if user wasn't already authenticated
        // this is just to make sure we don't initiate multiple sockets
        if (SocketIO.check() === false) {
          SocketIO.init(dispatch);
        }

        dispatch({
          type: AUTHENTICATE_USER,
          payload: user
        });
      } else {
        dispatch({
          type: UNAUTHENTICATE_USER
        });
      }
    });
  };
}

export function fetchOnlineUsers(groupName) {
  return dispatch => {
    return axios
      .get(`${config.API_HOST}/auth/users`)
      .then(response => {
        dispatch({
          type: ONLINE_USERS,
          payload: response.data.onlineUsers
        });
      })
      .catch(error => {
        console.log("Request failed", error.response.data.error);
      });
  };
}
