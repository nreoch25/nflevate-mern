import SocketIO from "./SocketIO";

class PrivateMessage extends SocketIO {
  static joinPrivateChat() {}
  static leavePrivateChat() {}
  static sendMessage({ sender, receiver, body }, callback) {
    console.log(sender, receiver, body);
    this.socket.emit(
      "createPrivateMessage",
      {
        sender,
        receiver,
        body
      },
      () => {
        callback();
      }
    );
  }
}

export default PrivateMessage;
