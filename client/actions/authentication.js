import axios from "axios";

export const AUTHENTICATE_USER = "AUTHENTICATE_USER";
export const UNAUTHENTICATE_USER = "UNAUTHENTICATE_USER";
export const AUTHENTICATION_ERROR = "AUTHENTICATION_ERROR";

export function signupUser({ username, email, password }, history) {
  return dispatch => {
    axios
      .post("/auth/signup", { username, email, password })
      .then(response => {
        console.log("Successful Signup", response.data);
        dispatch({
          type: AUTHENTICATE_USER,
          payload: response.data
        });
        history.push("/home");
      })
      .catch(error => {
        console.log("Failed Signup", error.response.data.error);
        dispatch(authError(error.response.data.error));
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
      console.log("USER", user);
      if (user) {
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
