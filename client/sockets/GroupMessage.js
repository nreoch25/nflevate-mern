import SocketIO from "./SocketIO";
import { GROUP_USERS, GROUP_MESSAGES } from "../actions/groups";

class GroupMessage extends SocketIO {
  static joinGroup({ name, group }) {
    this.socket.emit("joinGroup", { name, group }, () => {
      console.log(`${name} has joined the ${group} group`);
    });
    this.socket.on("groupUsers", users => {
      this.dispatch({
        type: GROUP_USERS,
        payload: users
      });
    });
  }
  static leaveGroup({ name, group }) {
    this.socket.emit("leaveGroup", { name, group }, () => {
      console.log(`${name} has left the ${group} group`);
    });
  }
  static sendMessage({ name, group, body }, callback) {
    this.socket.emit(
      "createMessage",
      {
        name,
        group,
        body
      },
      () => {
        callback();
      }
    );
    this.socket.on("groupMessages", groupMessages => {
      this.dispatch({
        type: GROUP_MESSAGES,
        payload: groupMessages
      });
    });
  }
}

export default GroupMessage;
