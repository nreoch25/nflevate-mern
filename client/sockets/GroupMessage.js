import SocketIO from "./SocketIO";
import { GROUP_USERS } from "../actions/groups";

class GroupMessage extends SocketIO {
  static joinGroup({ name, group }) {
    console.log("SOCKET JOIN GROUP", name, group);
    this.socket.emit("join", { name, group }, () => {
      console.log(`${name} has joined the ${group} group.`);
    });
    this.socket.on("groupUsers", users => {
      console.log("groupUsers", users);
      this.dispatch({
        type: GROUP_USERS,
        payload: users
      });
    });
  }
}

export default GroupMessage;
