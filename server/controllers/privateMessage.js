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
          console.log(doc);
          resolve(doc);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
