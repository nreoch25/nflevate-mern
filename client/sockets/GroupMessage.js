import SocketIO from "./SocketIO";
import { GROUP_USERS } from "../actions/groups";

class GroupMessage extends SocketIO {
  static joinGroup({ name, group }) {
    console.log("SOCKET JOIN GROUP", name, group);
    this.socket.emit("join", { name, group }, () => {
      console.log(`${name} has joined the ${group} group`);
    });
    this.socket.on("groupUsers", users => {
      console.log("groupUsers", users);
      this.dispatch({
        type: GROUP_USERS,
        payload: users
      });
    });
  }
  static leaveGroup({ name, group }) {
    console.log("SOCKET LEAVE GROUP", name, group);
    this.socket.emit("leave", { name, group }, () => {
      console.log(`${name} has left the ${group} group`);
    });
  }
}

export default GroupMessage;
