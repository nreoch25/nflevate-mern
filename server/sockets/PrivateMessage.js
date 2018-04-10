import privateMessage from "../controllers/privateMessage";

class PrivateMessage {
  static sendMessage({ sender, receiver, body }, io, callback) {
    privateMessage.sendMessage(sender, receiver, body).then(privateMessages => {
      //io.to(group).emit("privateMessages", privateMessages);
      callback();
    });
  }
}

export default PrivateMessage;
