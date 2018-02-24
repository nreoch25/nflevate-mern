const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupMessageSchema = Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  body: { type: String },
  group: { type: mongoose.Schema.Types.ObjectId, ref: "Group" },
  createdAt: { type: Date, default: Date.now() }
});

module.exports = mongoose.model("GroupMessage", groupMessageSchema);
