const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    order_id: { type: Number, required: true },
    customer_id: { type: Number, required: true },
    workshop_id: { type: mongoose.Types.ObjectId, require: true },
    created_at: { type: Date, default: Date.now },
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
schema.index({ order_id: 1, customer_id: 1, workshop_id: 1 }, { unique: true });

const model = mongoose.model("Offer", schema);

module.exports = model;
