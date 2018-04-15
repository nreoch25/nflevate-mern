import io from "socket.io-client";
import { ONLINE_USERS } from "../actions/authentication";

class SocketIO {
  static check() {
    // checks if socketIO is connected
    return this.socket.connected;
  }
  static disconnect() {
    // disconnect socketIO on user logout
    this.socket.disconnect();
  }
  static init(dispatch) {
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
