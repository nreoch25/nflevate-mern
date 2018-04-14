import User from "../models/user";

export default {
  setRouting: function(router) {
    router.get("/api/profile/:user", this.getProfile);
    router.post("/api/profile/request", this.friendRequest);
  },
  friendRequest(req, res) {
    User.findOneAndUpdate(
      { username: req.body.user },
      { $push: { sentRequests: req.body.friend } },
      { new: true }
    )
      .then(doc1 => {
        User.findOneAndUpdate(
          { username: req.body.friend },
          { $inc: { totalRequests: 1 }, $push: { requests: req.body.user } }
        )
          .then(doc2 => {
            res.send({ sender: doc1, receiver: doc2 });
          })
          .catch(error => res.status(422).send({ error }));
      })
      .catch(error => res.status(422).send({ error }));
  },
  getProfile(req, res) {
    console.log(req.params.user);
    User.findOne({ username: req.params.user })
      .then(document => {
        if (document) {
          const profileObj = {
            favouriteTeam: document.favouriteTeam,
            favouritePlayer: document.favouritePlayer
          };
          return res.send({ profile: profileObj });
        }
        return res.status(422).send({ error: "Could not return profile" });
      })
      .catch(error => res.status(422).send({ error }));
  }
};
