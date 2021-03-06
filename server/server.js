import express from "express";
import compression from "compression";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import validator from "express-validator";
import cors from "cors";
import fileUpload from "express-fileupload";
import passport from "passport";
import passportSocketIO from "passport.socketio";
import mongoose from "mongoose";
import path from "path";
import http from "http";
import serverConfig from "./config";
import devServer from "./utils/devServer";
import dbSetup from "./utils/dbSetup";
import reactApp from "./utils/reactApp";
// mongodb imports
import users from "./controllers/users";
import admin from "./controllers/admin";
import groups from "./controllers/groups";
import profile from "./controllers/profile";
import privateMessage from "./controllers/privateMessage";
import news from "./controllers/news";
// SocketIO class
import SocketIO from "./sockets/SocketIO";
// import connect mongo
const MongoStore = require("connect-mongo")(session);

// Initialize the Express app
const app = new express();
// Initialize the server for express and socket.io
const server = http.createServer(app);
// import socket.io
const io = require("socket.io")(server);
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
// Initialize session store
const sessionStore = new MongoStore({
  mongooseConnection: mongoose.connection
});
app.use(
  session({
    secret: serverConfig.expressSessionSecret,
    cookie: {
      maxAge: 960000
    },
    resave: true,
    saveUninitialized: false,
    store: sessionStore
  })
);
// Initialize passport socketIO
// Allows us to authenticate socketIO requests
io.use(
  passportSocketIO.authorize({
    key: "connect.sid",
    secret: serverConfig.expressSessionSecret,
    store: sessionStore,
    passport: passport,
    cookieParser: cookieParser
  })
);
//app.use(fileUpload());
app.use(passport.initialize());
app.use(passport.session());

// Initialize the Router
const router = express.Router();

users.setRouting(router);
admin.setRouting(router);
groups.setRouting(router);
profile.setRouting(router);
privateMessage.setRouting(router);
news.setRouting(router);

app.use(router);

// Reach Application
app.get("*", reactApp);

// Initialize SocketIO
SocketIO.init(io);

server.listen(serverConfig.port, error => {
  if (!error) {
    console.log(`Application is running on port: ${serverConfig.port}`);
  }
});
