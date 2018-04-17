import axios from "axios";
export const FETCH_PLAYER_NEWS = "FETCH_PLAYER_NEWS";

export function fetchPlayerNews() {
  return dispatch => {
    return axios
      .get("/api/news/player")
      .then(response => {
        console.log("PLAYER NEWS ACTIONS", response.data);
        // TODO parse xml string and figure out how to make array of objects
        // dispatch({
        //   type: FETCH_PLAYER_NEWS,
        //   payload: response.data
        // });
      })
      .catch(error => {
        console.log("Request failed", error.response.data.error);
      });
  };
}
