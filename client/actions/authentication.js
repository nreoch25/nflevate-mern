import axios from "axios";
import SocketIO from "../utils/SocketIO";

export const AUTHENTICATE_USER = "AUTHENTICATE_USER";
export const UNAUTHENTICATE_USER = "UNAUTHENTICATE_USER";
export const AUTHENTICATION_ERROR = "AUTHENTICATION_ERROR";

export function signupUser({ username, email, password }, history) {
  return dispatch => {
    axios
      .post("http://localhost:8000/auth/signup", { username, email, password })
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
      .post("http://localhost:8000/auth/login", { email, password })
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
    axios.post("http://localhost:8000/auth/logout").then(() => {
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
  return dispatch => {
    axios.post("http://localhost:8000/auth/user").then(response => {
      const user = response.data.user;
      console.log("Current User", user);
      if (user) {
        // initiate socket.io only if user wasn't already authenticated
        // this is just to make sure we don't initiate multiple sockets
        if (SocketIO.check() === false) {
          SocketIO.init();
        }

        SocketIO.online();

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
