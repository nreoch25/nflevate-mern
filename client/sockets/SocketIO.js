import io from "socket.io-client";

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
  }
}

export default SocketIO;
