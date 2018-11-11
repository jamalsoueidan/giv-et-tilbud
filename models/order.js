const mongoose = require("mongoose");

/*
 don't change the  schema for this collection, maybe we lose all the orders and need to import them again from shopify!
*/
const schema = new mongoose.Schema(
  {
    id: { type: Number, unique: true, required: true },
    email: String,
    created_at: Date,
    updated_at: Date,
    fulfillment_status: String,
    phone: String,
    order_status_url: String,
    token: String,
    customer: {
      id: Number,
      first_name: String,
      last_name: String
    },
    shipping_address: {
      address1: String,
      city: String,
      zip: Number
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
    ],
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
  },
  {
    collection: "orders"
  }
);

schema.index({ location: "2dsphere" });
schema.index({ fulfillment_status: 1 });
schema.index({ token: 1, order_status_url: "text" });
schema.index({
  "line_items.properties.name": "text",
  "line_items.properties.value": "text"
});
schema.index({ created_at: -1 });

const model = mongoose.model("Order", schema);

module.exports = model;
