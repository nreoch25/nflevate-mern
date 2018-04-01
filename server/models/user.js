const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

const userSchema = Schema({
  username: { type: String },
  fullname: { type: String },
  email: { type: String, unique: true, lowercase: true },
  password: { type: String, default: "" },
  type: { type: String, default: "user" },
  userImage: { type: String, default: "default.png" },
  google: { type: String, default: "" },
  sentRequest: [
    {
      username: { type: String, default: "" }
    }
  ],
  request: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      username: { type: String, default: "" }
    }
  ],
  friendsList: [
    {
      friendId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      friendName: { type: String, default: "" }
    }
  ],
  totalRequests: { type: Number, default: 0 },
  favouriteTeam: { type: String, default: "No favourite team specified" },
  favouritePlayer: { type: String, default: "No favourite player specified" }
});

userSchema.methods.encryptPassword = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

userSchema.methods.validUserPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
