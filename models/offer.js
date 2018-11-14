const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    order_id: { type: Number, required: true },
    customer_id: { type: Number, required: true },
    workshop_id: { type: mongoose.Types.ObjectId, require: true },
    created_at: { type: Date, default: Date.now },
    accepted: { type: Boolean, default: false },
    accepted_at: Date,
    booking: { type: String, enum: ["phone", "datetime"] },
    booking_at: Date,
    distance: String,
    duration: String,
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
schema.index({ accepted: 1 });
schema.index({ booking: 1 });

const model = mongoose.model("Offer", schema);

module.exports = model;
