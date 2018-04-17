import User from "../models/user";
import requireLogin from "../middleware/requireLogin";

export default {
  setRouting: function(router) {
    router.get("/api/profile/:user", requireLogin, this.getProfile);
    router.post("/api/profile/request", requireLogin, this.friendRequest);
    router.post(
      "/api/profile/request/cancel",
      requireLogin,
      this.cancelFriendRequest
    );
    router.post(
      "/api/profile/request/decline",
      requireLogin,
      this.declineFriendRequest
    );
    router.post(
      "/api/profile/request/accept",
      requireLogin,
      this.acceptFriendRequest
    );
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
              totalRequests: doc1.totalRequests,
              friendsList: doc1.friendsList
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
              totalRequests: doc1.totalRequests,
              friendsList: doc1.friendsList
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
              totalRequests: doc2.totalRequests,
              friendsList: doc2.friendsList
            };
            res.send({ profile: profileObj });
          })
          .catch(error => res.status(422).send({ error }));
      })
      .catch(error => res.status(422).send({ error }));
  },
  acceptFriendRequest(req, res) {
    User.findOneAndUpdate(
      { username: req.body.acceptUser },
      {
        $pull: { sentRequests: req.body.user },
        $push: { friendsList: req.body.user }
      },
      { new: true }
    )
      .then(doc1 => {
        User.findOneAndUpdate(
          { username: req.body.user },
          {
            $inc: { totalRequests: -1 },
            $pull: { requests: req.body.acceptUser },
            $push: { friendsList: req.body.acceptUser }
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
              totalRequests: doc2.totalRequests,
              friendsList: doc2.friendsList
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
            totalRequests: document.totalRequests,
            friendsList: document.friendsList
          };
          return res.send({ profile: profileObj });
        }
        return res.status(422).send({ error: "Could not return profile" });
      })
      .catch(error => res.status(422).send({ error }));
  }
};
