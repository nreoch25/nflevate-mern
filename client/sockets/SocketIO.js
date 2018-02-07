import io from "socket.io-client";
import { ONLINE_USERS } from "../actions/authentication";

class SocketIO {
  static initialOnline() {
    this.socket.emit("online");
  }
  static online() {
    if (this.onlineSet === false) {
      this.onlineSet = true;
      this.socket.on("online", users => {
        console.log("CLIENT ONLINE USERS", users);
        this.dispatch({
          type: ONLINE_USERS,
          payload: users
        });
      });
    }
  }
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
    this.onlineSet = false;
    this.dispatch = dispatch;
  }
}

export default SocketIO;
