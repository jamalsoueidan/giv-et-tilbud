const Order = require("../../models/order");
const Offer = require("../../models/offer");
const Boom = require("boom");
const fulfillOrder = require("./_fulfill_order.js");

module.exports = async req => {
  const { token, key } = req.query;
  const { offerId } = req.params;

  const order = await Order.findOne({
    token: token,
    order_status_url: {
      $regex: new RegExp(key, "ig")
    }
  });

  if (!order) {
    return Boom.badData();
  }

  if (!order.fulfillment_status) {
    fulfillOrder(order, false);
  }

  const booking = req.payload.booking === "phone" ? "phone" : "datetime";
  const booking_at = booking === "phone" ? new Date() : req.payload.booking_at;

  const offer = await Offer.findOneAndUpdate(
    {
      _id: offerId,
      order_id: order.id
    },
    {
      booking: booking,
      booking_at: booking_at
    },
    {
      new: true
    }
  );

  return offer;
};
