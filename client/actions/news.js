import axios from "axios";
export const FETCH_PLAYER_NEWS = "FETCH_PLAYER_NEWS";
import { xmlParser } from "../utils/xmlParser";

export function fetchPlayerNews() {
  return dispatch => {
    return axios
      .get("http://localhost:8000/api/news/player")
      .then(response => {
        const playerNews = xmlParser(response.data.playerNews);
        console.log(playerNews);
        //console.log(playerNews);
        //const newsXML = window.jQuery.parseXML(response.data);
        //console.log(newsXML);
        // dispatch({
        //   type: FETCH_PLAYER_NEWS,
        //   payload: response.data
        // });
      })
      .catch(error => {
        console.log("Request failed", error);
      });
  };
}
