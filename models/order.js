const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    id: { type: Number, unique: true, required: true },
    email: String,
    created_at: Date,
    updated_at: Date,
    fulfillment_status: String,
    phone: String,
    customer: {
      id: Number,
      first_name: String,
      last_name: String,
      country_code: String
    },
    shipping_address: {
      address1: String,
      city: String,
      zip: Number,
      latitude: Number,
      longitude: Number
    },
    line_items: [
      {
        properties: [
          {
            name: String,
            value: String
          }
        ]
      }
    ]
  },
  {
    collection: "orders"
  }
);

const model = mongoose.model("Order", schema);

module.exports = model;
