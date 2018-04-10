import privateMessage from "../controllers/privateMessage";

class PrivateMessage {
  static sendMessage({ sender, receiver, body }, io, callback) {
    privateMessage.sendMessage(sender, receiver, body).then(privateMessages => {
      // when messages are sent we need to send messages to both of these groups
      io.to(`${sender} ${receiver}`).emit("privateMessages", privateMessages);
      io.to(`${receiver} ${sender}`).emit("privateMessages", privateMessages);
      callback();
    });
  }
}

export default PrivateMessage;
