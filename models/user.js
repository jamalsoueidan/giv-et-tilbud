const mongoose = require("mongoose");

// Geo JSON https://stackoverflow.com/questions/32199658/create-find-geolocation-in-mongoose
const schema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    password: String,
    customer_id: { type: Number, unique: true, required: true },
    workshops: [
      {
        name: String,
        address: String,
        zip: Number,
        city: String,
        email: String,
        phone: Number,
        location: {
          type: {
            type: String,
            enum: "Point",
            default: "Point"
          },
          coordinates: {
            type: [Number],
            default: [0, 0]
          }
        }
      }
    ]
  },
  {
    collection: "users"
  }
);

schema.index({ "workshops.location": "2dsphere" });

const model = mongoose.model("User", schema);

module.exports = model;
