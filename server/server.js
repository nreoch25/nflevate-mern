import express from "express";
import compression from "compression";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import validator from "express-validator";
import cors from "cors";
import fileUpload from "express-fileupload";
import passport from "passport";
import mongoose from "mongoose";
import path from "path";
import serverConfig from "./config";
import devServer from "./utils/devServer";
import dbSetup from "./utils/dbSetup";
import reactApp from "./utils/reactApp";
import users from "./controllers/users";
import admin from "./controllers/admin";

const MongoStore = require("connect-mongo")(session);

// Initialize the Express app
const app = new express();
// Initialize webpack dev middleware
devServer(app);
// Start the database
dbSetup();

// Express middleware setup
// require passport-google setup
require("./passport/passport-local");
require("./passport/passport-google");
app.use(cors());
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, "../dist")));
app.use(validator());
app.use(
  session({
    secret: serverConfig.expressSessionSecret,
    cookie: {
      maxAge: 3600000
    },
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);
//app.use(fileUpload());
app.use(passport.initialize());
app.use(passport.session());

// Initialize the Router
const router = express.Router();

users.setRouting(router);
admin.setRouting(router);

app.use(router);

// Reach Application
app.get("*", reactApp);

app.listen(serverConfig.port, error => {
  if (!error) {
    console.log(`Application is running on port: ${serverConfig.port}`);
  }
});
