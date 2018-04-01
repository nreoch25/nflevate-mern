import Group from "../models/group";
import GroupMessage from "../models/groupmessage";

export default {
  setRouting: function(router) {
    router.get("/api/group", this.getGroups);
    router.post("/api/group/messages", this.groupMessages);
  },
  getGroups: function(req, res) {
    Group.find({}, (err, groups) => {
      if (err) {
        return res.status(422).send({ error: "Could not return groups" });
      }
      return res.send({ groups });
    });
  },
  groupMessages: function(req, res) {
    GroupMessage.find({ group: req.body.groupName }, (err, groupMessages) => {
      if (err) {
        return res
          .status(422)
          .send({ error: "Could not return group messages" });
      }
      return res.send({ groupMessages });
    });
  },
  sendMessage: function(name, group, body) {
    return new Promise((resolve, reject) => {
      const message = new GroupMessage();
      message.sender = name;
      message.group = group;
      message.body = body;
      message.createdAt = Date.now();
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
  },
  removeFromGroup(user) {
    return new Promise((resolve, reject) => {
      Group.findOne({ currentUsers: user })
        .then(document => {
          if (document) {
            Group.findOneAndUpdate(
              { name: document.name },
              { $pull: { currentUsers: user } },
              { new: true },
              (error, document) => {
                if (error) {
                  return reject(error.message);
                }
                resolve(document);
              }
            );
          }
        })
        .catch(error => reject(error));
    });
  }
};
