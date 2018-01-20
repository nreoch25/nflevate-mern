import fileUpload from "../utils/fileUpload";
import Group from "../models/group";

export default {
  setRouting: function(router) {
    router.post("/api/group", this.postGroup);
  },
  postGroup: function(req, res) {
    fileUpload(
      req,
      (groupName, fileName) => {
        const newGroup = new Group();
        newGroup.name = groupName;
        newGroup.image = fileName;
        newGroup.save(err => {
          res.send({ message: "Upload successful" });
        });
      },
      () => {
        res.send({ error: "Could not upload image" });
      }
    );
  }
};
