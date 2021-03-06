const mongoose = require("mongoose");

// Geo JSON https://stackoverflow.com/questions/32199658/create-find-geolocation-in-mongoose
const schema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    customer_id: { type: Number, unique: true, required: true },
    created_at: { type: Date, default: Date.now },
    is_admin: { type: Boolean, default: false },
    workshops: [
      {
        name: String,
        address: String,
        zip: Number,
        city: String,
        email: String,
        phone: Number,
        vat: Number,
        created_at: { type: Date, default: Date.now },
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
schema.index(
  {
    email: "text",
    "workshops.name": "text",
    address: "text",
    "workshops.city": "text"
  },
  {
    default_language: "danish"
  }
);
schema.index({ customer_id: 1 });
schema.index({ email: 1 });

const model = mongoose.model("User", schema);

module.exports = model;
