import passport from "passport";
import userValidation from "../middleware/userValidation";
import Online from "../models/online";

export default {
  setRouting: function(router) {
    router.get("/auth/google", this.getGoogleLogin);
    router.get("/auth/google/callback", this.getGoogleCallback);
    router.get("/auth/users", this.getUsers);
    router.post("/auth/logout", this.userLogout);
    router.post("/auth/user", this.currentUser);
    router.post(
      "/auth/login",
      userValidation.loginValidation,
      (req, res, next) => {
        passport.authenticate("local.login", (err, user, info) => {
          if (err) {
            return next(err);
          }
          if (!user) {
            return res.status(422).send({ error: "Invalid login credentials" });
          }
          req.login(user, err => {
            if (err) {
              return next(err);
            }
            return res.send({
              user: req.user
            });
          });
        })(req, res, next);
      }
    );
    router.post(
      "/auth/signup",
      userValidation.signupValidation,
      (req, res, next) => {
        // custom passport callback to return error response
        passport.authenticate("local.signup", (err, user, info) => {
          if (err) {
            return next(err);
          }
          if (!user) {
            return res
              .status(422)
              .send({ error: "Email address is already in use" });
          }
          req.login(user, err => {
            if (err) {
              return next(err);
            }
            return res.send({
              user: req.user
            });
          });
        })(req, res, next);
      }
    );
  },
  getGoogleLogin: passport.authenticate("google", {
    scope: ["profile", "email"]
  }),
  getGoogleCallback: passport.authenticate("google", {
    successRedirect: "/home",
    failureRedirect: "/signup"
  }),
  userLogout: function(req, res) {
    req.session.destroy();
    req.logout();
    res.send({ message: "Successfully logged out" });
  },
  currentUser: function(req, res) {
    if (typeof req.user === "undefined") {
      return res.send({ user: false });
    }
    res.send({ user: req.user });
  },
  getUsers: function(req, res) {
    Online.find({})
      .then(response => res.send({ onlineUsers: response }))
      .catch(error => res.status(422).send({ error: error }));
  }
};
