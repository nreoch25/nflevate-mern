import io from "socket.io-client";
import { ONLINE_USERS } from "../actions/authentication";

class SocketIO {
  static check() {
    console.log("SOCKET IO.check - socket io client", this.socket.connected);
    // checks if socketIO is connected
    return this.socket.connected;
  }
  static disconnect() {
    // disconnect socketIO on user logout
    this.socket.disconnect();
  }
  static init(dispatch) {
    console.log("SOCKET IO.init - socket io client");
    // initiate socketIO connection
    this.socket = io.connect();
    this.dispatch = dispatch;
    // listen for OnlineUsers
    this.socket.on("online", onlineUsers => {
      this.dispatch({
        type: ONLINE_USERS,
        payload: onlineUsers
      });
    });
  }
}

export default SocketIO;
