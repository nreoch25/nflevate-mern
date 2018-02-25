import Group from "../models/group";
import GroupMessage from "../models/groupmessage";
import requireLogin from "../middleware/requireLogin";

export default {
  setRouting: function(router) {
    router.get("/api/group", this.getGroups);
    router.post("/api/group/message", this.postGroupMessage);
  },
  getGroups: function(req, res) {
    Group.find({}, (err, groups) => {
      if (err) {
        return res.status(422).send({ error: "Could not return groups" });
      }
      return res.send({ groups });
    });
  },
  // TODO post group message to mongo
  postGroupMessage: function(req, res) {
    console.log("POST GROUP MESSAGE", req.body);
  },
  joinGroup: function(name, group) {
    return new Promise((resolve, reject) => {
      Group.findOneAndUpdate(
        { name: group },
        { $push: { currentUsers: name } },
        { new: true },
        (error, document) => {
          if (error) {
            return reject(error.message);
          }
          resolve(document);
        }
      );
    });
  }
};
