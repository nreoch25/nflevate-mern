import Group from "../models/group";
import GroupMessage from "../models/groupmessage";
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
  },
  sendMessage: function(name, group, body) {
    return new Promise((resolve, reject) => {
      const message = new GroupMessage();
      message.sender = name;
      message.group = group;
      message.body = body;
      message
        .save()
        .then(() => {
          GroupMessage.find({ group: group })
            .then(docs => {
              resolve(docs);
            })
            .catch(err => {
              reject(err);
            });
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  joinGroup: function(name, group) {
    return new Promise((resolve, reject) => {
      Group.findOne(
        { $and: [{ name: group }, { currentUsers: name }] },
        (error, doc) => {
          if (!doc) {
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
          }
        }
      );
    });
  },
  leaveGroup: function(name, group) {
    return new Promise((resolve, reject) => {
      Group.findOne(
        { $and: [{ name: group }, { currentUsers: name }] },
        (error, doc) => {
          if (doc) {
            console.log("CONTROLLER - REMOVE USER FROM GROUP", doc);
            Group.findOneAndUpdate(
              { name: group },
              { $pull: { currentUsers: name } },
              { new: true },
              (error, document) => {
                if (error) {
                  return reject(error.message);
                }
                resolve(document);
              }
            );
          }
        }
      );
    });
  }
};
