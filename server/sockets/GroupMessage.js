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
}

export default GroupMessage;
