import SocketIO from "./SocketIO";
import { FETCH_PRIVATE_MESSAGES } from "../actions/privateMessages";

class PrivateMessage extends SocketIO {
  static joinPrivateChat({ sender, receiver }) {
    this.socket.emit("joinPM", { sender, receiver });
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
      this.dispatch({
        type: FETCH_PRIVATE_MESSAGES,
        payload: privateMessages
      });
    });
  }
}

export default PrivateMessage;
