const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    orderId: { type: Number, required: true },
    customerId: { type: Number, required: true },
    properties: [
      {
        name: String,
        value: String
      }
    ]
  },
  {
    collection: "offers"
  }
);
schema.index({ orderId: 1, customerId: 1 }, { unique: true });

const model = mongoose.model("Offer", schema);

module.exports = model;
