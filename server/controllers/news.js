import requireLogin from "../middleware/requireLogin";
import axios from "axios";

const articlesURL =
  "http://www.rotoworld.com/rss/feed.aspx?sport=nfl&ftype=article&count=20&format=rss";
const playerNewsURL =
  "http://www.rotoworld.com/rss/feed.aspx?sport=nfl&ftype=news&count=20&format=rss";

export default {
  setRouting: function(router) {
    router.get("/api/news/player", requireLogin, this.getPlayerNews);
  },
  getPlayerNews: function(req, res) {
    axios
      .get(playerNewsURL)
      .then(response => {
        return res.send({ playerNews: response.data });
      })
      .catch(error => res.status(422).send({ error: error }));
  }
};
