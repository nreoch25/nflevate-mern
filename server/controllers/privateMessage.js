import PrivateMessage from "../models/privatemessage";

export default {
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
