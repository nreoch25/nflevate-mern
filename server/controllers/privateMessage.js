import PrivateMessage from "../models/privatemessage";

export default {
  setRouting: function(router) {
    router.post("/api/private/messages", this.privateMessages);
  },
  privateMessages: function(req, res) {
    const { sender, receiver } = req.body;
    PrivateMessage.find({
      $and: [
        { $or: [{ sender: sender }, { sender: receiver }] },
        { $or: [{ receiver: sender }, { receiver: receiver }] }
      ]
    })
      .then(doc => {
        return res.send(doc);
      })
      .catch(error => {
        return res.send({ error: "Could not return private messages" });
      });
  },
  sendMessage: function(sender, receiver, body) {
    return new Promise((resolve, reject) => {
      const privateMessage = new PrivateMessage();
      privateMessage.sender = sender;
      privateMessage.receiver = receiver;
      privateMessage.body = body;
      privateMessage.createdAt = Date.now();
      privateMessage
        .save()
        .then(doc => {
          PrivateMessage.find({
            $and: [
              { $or: [{ sender: sender }, { sender: receiver }] },
              { $or: [{ receiver: sender }, { receiver: receiver }] }
            ]
          })
            .then(doc => {
              return resolve(doc);
            })
            .catch(error => {
              return reject(error);
            });
        })
        .catch(err => {
          return reject(err);
        });
    });
  }
};
