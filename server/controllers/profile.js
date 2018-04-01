import User from "../models/user";

export default {
  setRouting: function(router) {
    router.get("/api/profile/:user", this.getProfile);
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
