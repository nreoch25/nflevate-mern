import OnlineUsers from "./OnlineUsers";
import GroupMessage from "./GroupMessage";

class SocketIO {
  static connection() {
    // initialize globalRoom instance
    // initialize Global class
    this.io.on("connection", socket => {
      console.log("connected to socket.io");
      // add the user to the db as an online user
      OnlineUsers.addOnlineUser(socket, this.io);
      // remove online user on disconnect
      socket.on("disconnect", () => {
        console.log("user disconnected");
        // remove the user from the db as an online user
        OnlineUsers.removeOnlineUser(socket, this.io);
      });
      // listen to join a user to a group chat
      socket.on("join", (params, callback) => {
        // join the user to the socket channel for group messages
        socket.join(params.group);
        // need to add user to group in db
        GroupMessage.joinGroup(params, this.io, callback);
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
