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
  static init() {
    // initiate socketIO connection
    this.socket = io.connect("http://localhost:8000", { forceNew: true });
  }
}

export default SocketIO;
