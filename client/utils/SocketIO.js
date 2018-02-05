import io from "socket.io-client";

class SocketIO {
  static initialOnline() {
    this.socket.emit("online");
  }
  static online() {
    if (this.onlineSet === false) {
      console.log("***HERE***");
      this.onlineSet = true;
      this.socket.on("online", users => {
        console.log("CLIENT ONLINE USERS", users);
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
  static init() {
    // initiate socketIO connection
    this.socket = io.connect();
    this.onlineSet = false;
  }
}

export default SocketIO;
