import Global from "../sockets/Global";

class SocketIO {
  static connection() {
    // initialize Global class
    this.io.on("connection", socket => {
      console.log("connected to socket.io", socket.request.user);
      // join the global room
      socket.join("global");
      Global.addUser(socket.id, socket.request.user);

      socket.on("disconnect", () => {
        console.log("user disconnected");
        Global.removeUser(socket.id);
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
