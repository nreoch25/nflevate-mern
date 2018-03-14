import SocketIO from "./SocketIO";
import { GROUP_USERS } from "../actions/groups";

class GroupMessage extends SocketIO {
  static joinGroup({ name, group }) {
    this.socket.emit("join", { name, group }, () => {
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
    this.socket.emit("leave", { name, group }, () => {
      console.log(`${name} has left the ${group} group`);
    });
  }
  static sendMessage({ name, group, body }) {
    this.socket.emit(
      "createMessage",
      {
        name,
        group,
        body
      },
      () => {
        console.log(`${name} has sent a new message to ${group} group`);
      }
    );
    this.socket.on("groupMessages", groupMessages => {
      console.log(groupMessages);
    });
  }
}

export default GroupMessage;
