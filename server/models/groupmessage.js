const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupMessageSchema = Schema({
  sender: { type: String },
  body: { type: String },
  group: { type: String },
  createdAt: { type: Date, default: Date.now() }
});

module.exports = mongoose.model("GroupMessage", groupMessageSchema);
