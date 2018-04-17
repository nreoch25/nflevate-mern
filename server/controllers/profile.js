import User from "../models/user";

export default {
  setRouting: function(router) {
    router.get("/api/profile/:user", this.getProfile);
    router.post("/api/profile/request", this.friendRequest);
    router.post("/api/profile/request/cancel", this.cancelFriendRequest);
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
  cancelFriendRequest(req, res) {
    User.findOneAndUpdate(
      { username: req.body.user },
      { $pull: { sentRequests: req.body.cancelUser } },
      { new: true }
    )
      .then(doc1 => {
        User.findOneAndUpdate(
          { username: req.body.cancelUser },
          { $inc: { totalRequests: -1 }, $pull: { requests: req.body.user } }
        )
          .then(doc2 => {
            const profileObj = {
              favouriteTeam: doc1.favouriteTeam,
              favouritePlayer: doc1.favouritePlayer,
              sentRequests: doc1.sentRequests
            };
            res.send({ profile: profileObj });
          })
          .catch(error => res.status(422).send({ error }));
      })
      .catch(error => res.status(422).send({ error }));
  },
  getProfile(req, res) {
    User.findOne({ username: req.params.user })
      .then(document => {
        if (document) {
          const profileObj = {
            favouriteTeam: document.favouriteTeam,
            favouritePlayer: document.favouritePlayer,
            sentRequests: document.sentRequests
          };
          return res.send({ profile: profileObj });
        }
        return res.status(422).send({ error: "Could not return profile" });
      })
      .catch(error => res.status(422).send({ error }));
  }
};
