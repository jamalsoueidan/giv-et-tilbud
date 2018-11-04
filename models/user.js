const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    password: String,
    workshops: [
      {
        name: String,
        address: String,
        zip: Number,
        city: String,
        email: String,
        phone: Number,
        latitude: Number,
        longitude: Number
      }
    ]
  },
  {
    collection: "users"
  }
);

const model = mongoose.model("User", schema);

module.exports = model;
