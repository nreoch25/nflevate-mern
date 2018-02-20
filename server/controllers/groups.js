import Group from "../models/group";
import requireLogin from "../middleware/requireLogin";

export default {
  setRouting: function(router) {
    router.get("/api/group", this.getGroups);
  },
  getGroups: function(req, res) {
    Group.find({}, (err, groups) => {
      if (err) {
        return res.status(422).send({ error: "Could not return groups" });
      }
      return res.send({ groups });
    });
  }
};
