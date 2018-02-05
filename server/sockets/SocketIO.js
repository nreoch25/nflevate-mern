import OnlineUsers from "./OnlineUsers";

class SocketIO {
  static connection() {
    // initialize globalRoom instance
    // initialize Global class
    this.io.on("connection", socket => {
      console.log("connected to socket.io");
      // add the user to the db as an online user
      OnlineUsers.addOnlineUser(socket, this.io);

      socket.on("disconnect", () => {
        console.log("user disconnected");
        // remove the user from the db as an online user
        OnlineUsers.removeOnlineUser(socket, this.io);
      });
    });
  }
  static init(io) {
    // store io in a class property
    this.io = io;
    // initialize socketIO connection listener
    this.connection();
  }
}

export default SocketIO;
