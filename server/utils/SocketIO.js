import online from "../controllers/online";

class SocketIO {
  static connection() {
    // initialize globalRoom instance
    // initialize Global class
    this.io.on("connection", socket => {
      console.log("connected to socket.io");
      // join the global room
      socket.join("online");
      online.addOnlineUser(socket.request.user);

      socket.on("disconnect", () => {
        console.log("user disconnected");
        online.removeOnlineUser(socket.request.user);
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
