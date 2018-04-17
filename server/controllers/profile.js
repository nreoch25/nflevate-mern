import User from "../models/user";

export default {
  setRouting: function(router) {
    router.get("/api/profile/:user", this.getProfile);
    router.post("/api/profile/request", this.friendRequest);
    router.post("/api/profile/request/cancel", this.cancelFriendRequest);
    router.post("/api/profile/request/decline", this.declineFriendRequest);
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
          { $inc: { totalRequests: 1 }, $push: { requests: req.body.user } },
          { new: true }
        )
          .then(doc2 => {
            const profileObj = {
              username: doc1.username,
              favouriteTeam: doc1.favouriteTeam,
              favouritePlayer: doc1.favouritePlayer,
              sentRequests: doc1.sentRequests,
              requests: doc1.requests,
              totalRequests: doc1.totalRequests
            };
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
          { $inc: { totalRequests: -1 }, $pull: { requests: req.body.user } },
          { new: true }
        )
          .then(doc2 => {
            const profileObj = {
              username: doc1.username,
              favouriteTeam: doc1.favouriteTeam,
              favouritePlayer: doc1.favouritePlayer,
              sentRequests: doc1.sentRequests,
              requests: doc1.requests,
              totalRequests: doc1.totalRequests
            };
            res.send({ profile: profileObj });
          })
          .catch(error => res.status(422).send({ error }));
      })
      .catch(error => res.status(422).send({ error }));
  },
  declineFriendRequest(req, res) {
    User.findOneAndUpdate(
      { username: req.body.cancelUser },
      { $pull: { sentRequests: req.body.user } },
      { new: true }
    )
      .then(doc1 => {
        User.findOneAndUpdate(
          { username: req.body.user },
          {
            $inc: { totalRequests: -1 },
            $pull: { requests: req.body.cancelUser }
          },
          { new: true }
        )
          .then(doc2 => {
            const profileObj = {
              username: doc2.username,
              favouriteTeam: doc2.favouriteTeam,
              favouritePlayer: doc2.favouritePlayer,
              sentRequests: doc2.sentRequests,
              requests: doc2.requests,
              totalRequests: doc2.totalRequests
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
            username: document.username,
            favouriteTeam: document.favouriteTeam,
            favouritePlayer: document.favouritePlayer,
            sentRequests: document.sentRequests,
            requests: document.requests,
            totalRequests: document.totalRequests
          };
          return res.send({ profile: profileObj });
        }
        return res.status(422).send({ error: "Could not return profile" });
      })
      .catch(error => res.status(422).send({ error }));
  }
};
