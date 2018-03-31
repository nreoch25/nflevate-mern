import groups from "../controllers/groups";

class GroupMessage {
  static joinGroup({ name, group }, io, callback) {
    groups
      .joinGroup(name, group)
      .then(document => {
        console.log("group joined", document);
        io.to(group).emit("groupUsers", document.currentUsers);
        callback();
      })
      .catch(error => {
        console.log(error);
      });
  }
  static leaveGroup({ name, group }, io, callback) {
    groups.leaveGroup(name, group).then(document => {
      console.log("group left", document);
      io.to(group).emit("groupUsers", document.currentUsers);
      callback();
    });
  }
  static sendMessage({ name, group, body }, io, callback) {
    groups.sendMessage(name, group, body).then(groupMessages => {
      io.to(group).emit("groupMessages", groupMessages);
      callback();
    });
  }
  static removeFromGroup(socket, io) {
    groups.removeFromGroup(socket.request.user.username).then(document => {
      io.to(document.name).emit("groupUsers", document.currentUsers);
    });
  }
}

export default GroupMessage;
