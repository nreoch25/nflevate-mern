const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const onlineSchema = Schema({
  username: { type: String, unique: true }
});

module.exports = mongoose.model("Online", onlineSchema);
