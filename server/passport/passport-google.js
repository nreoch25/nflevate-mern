import passport from "passport";
import User from "../models/user";
import config from "../config";
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: config.googleClientID,
      clientSecret: config.googleClientSecret,
      callbackURL: "http://localhost:8000/auth/google/callback/",
      passReqToCallback: true
    },
    (req, accessToken, refreshToken, profile, done) => {
      User.findOne({ google: profile.id }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, user);
        } else {
          const newUser = new User();
          newUser.google = profile.id;
          newUser.fullname = profile.displayName;
          newUser.username = profile.displayName;
          newUser.email = profile.emails[0].value;
          newUser.userImage = profile._json.image.url;

          newUser.save(err => {
            if (err) {
              return done(err);
            }
            return done(null, newUser);
          });
        }
      });
    }
  )
);
