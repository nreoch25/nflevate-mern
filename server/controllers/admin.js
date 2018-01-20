export default {
  setRouting: function(router) {
    router.post("/api/group", this.postGroup);
  },
  postGroup: function(req, res) {
    console.log("BODY", req.body);
    console.log(req.files.image);
    res.send({ hello: "world" });
  }
};
