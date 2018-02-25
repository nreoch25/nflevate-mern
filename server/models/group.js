const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupSchema = Schema({
  name: { type: String, default: "" },
  image: { type: String, default: "default.png" },
  currentUsers: [String],
  fans: [
    {
      username: { type: String, default: "" },
      email: { type: String, default: "" }
    }
  ]
});

module.exports = mongoose.model("Group", groupSchema);
