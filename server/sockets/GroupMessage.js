import groups from "../controllers/groups";

class GroupMessage {
  static joinGroup({ name, group }, io, callback) {
    groups
      .joinGroup(name, group)
      .then(document => {
        console.log("group joined", document);
        io.to(group).emit("groupUsers", document.currentUsers);
        // TODO callback
      })
      .catch(error => {
        console.log(error);
      });
  }
}

export default GroupMessage;
