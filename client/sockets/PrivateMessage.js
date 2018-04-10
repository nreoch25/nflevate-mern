import SocketIO from "./SocketIO";

class PrivateMessage extends SocketIO {
  static joinPrivateChat({ sender, receiver }) {
    this.socket.emit("joinPM", { sender, receiver });
    // TODO dispatch all the PMs for this sender/receiver when they join private chat
  }
  static leavePrivateChat({ sender, receiver }) {
    this.socket.emit("leavePM", { sender, receiver });
  }
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
    this.socket.on("privateMessages", privateMessages => {
      console.log("PRIVATE MESSAGES RECEIVED", privateMessages);
      // TODO dispatch the new private messages through redux
      // this.dispatch({
      //   type: GROUP_MESSAGES,
      //   payload: groupMessages
      // });
    });
  }
}

export default PrivateMessage;
