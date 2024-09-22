const mongoose = require("mongoose");
const User = require("./userSchema");

const tokenSchema = new mongoose.Schema({
  token: {
    type: String,
    // required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  createdAt: {
    type: Date,
    default: Date.now,
    // expires after 30mins
    expires: 1800,
    // expires: D , // 30mins
  },
});

module.exports = mongoose.model("Token", tokenSchema);
