import requireLogin from "../middleware/requireLogin";
import axios from "axios";

export default {
  setRouting: function(router) {
    console.log("HERE");
    router.get("/api/news/player", requireLogin, this.getPlayerNews);
  },
  getPlayerNews: function(req, res) {
    axios
      .get(
        "http://www.rotoworld.com/rss/feed.aspx?sport=nfl&ftype=article&count=20&format=rss"
      )
      .then(response => {
        return res.send({ playerNews: response.data });
      })
      .catch(error => res.status(422).send({ error: error }));
  }
};
