import passport from "passport";
import userValidation from "../utils/userValidation";

export default {
  setRouting: function(router) {
    router.get("/auth/google", this.getGoogleLogin);
    router.get("/auth/google/callback", this.getGoogleCallback);
    router.post("/auth/logout", this.userLogout);
    router.post("/auth/user", this.currentUser);
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
            return res.send({ user: req.user.username });
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
    req.logout();
    res.send({ message: "Successfully logged out" });
  },
  currentUser: function(req, res) {
    if (typeof req.user === "undefined") {
      return res.send({ user: false });
    }
    res.send({ user: req.user });
  }
};
