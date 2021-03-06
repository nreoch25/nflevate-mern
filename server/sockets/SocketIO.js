import OnlineUsers from "./OnlineUsers";
import GroupMessage from "./GroupMessage";
import PrivateMessage from "./PrivateMessage";

class SocketIO {
  static connection() {
    // initialize globalRoom instance
    // initialize Global class
    this.io.on("connection", socket => {
      console.log("connected to socket.io");
      // add online user
      OnlineUsers.addOnlineUser(socket, this.io);
      // remove online user on disconnect
      socket.on("disconnect", () => {
        console.log("user disconnected");
        // remove online user
        OnlineUsers.removeOnlineUser(socket, this.io);
        // remove user from groups if needed
        GroupMessage.removeFromGroup(socket, this.io);
      });
      // listen to join a user to a group chat
      socket.on("joinGroup", (params, callback) => {
        // join the user to the socket channel for group messages
        socket.join(params.group);
        // need to add user to group in db
        GroupMessage.joinGroup(params, this.io, callback);
      });
      // listen to remove a user from a chat group
      socket.on("leaveGroup", (params, callback) => {
        // remove the user from the socker channel for group messages
        socket.leave(params.group);
        // remove the user from the group in db
        GroupMessage.leaveGroup(params, this.io, callback);
      });
      // listen to join a user to a private chat
      socket.on("joinPM", params => {
        // need to join both users as senders and receivers
        socket.join(`${params.sender} ${params.receiver}`);
        socket.join(`${params.receiver} ${params.sender}`);
      });
      // listen to remove a user from a private chat
      socket.on("leavePM", params => {
        socket.leave(`${params.sender} ${params.receiver}`);
        socket.leave(`${params.receiver} ${params.sender}`);
      });
      // listen for incoming messages
      socket.on("createMessage", (params, callback) => {
        // send the message to the db
        GroupMessage.sendMessage(params, this.io, callback);
      });
      socket.on("createPrivateMessage", (params, callback) => {
        // send private message to the db
        PrivateMessage.sendMessage(params, this.io, callback);
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
