const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const privateMessageSchema = Schema({
  sender: { type: String },
  receiver: { type: String },
  body: { type: String },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now() }
});

module.exports = mongoose.model("PrivateMessage", privateMessageSchema);
