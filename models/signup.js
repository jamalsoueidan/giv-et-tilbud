const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    key: { type: String, unique: true },
    active: { type: Boolean, default: true }
  },
  {
    collection: "signup"
  }
);

const model = mongoose.model("Signup", schema);

module.exports = model;
