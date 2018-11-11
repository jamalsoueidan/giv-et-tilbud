const Order = require("../../models/order");
const Offer = require("../../models/offer");
const Boom = require("boom");
const aggregateOrderWithOffers = require("./_aggregate_order_with_offers.js");

module.exports = async req => {
  const { orderId } = req.params;
  const credentials = req.auth.credentials;

  const order = await Order.countDocuments({
    id: orderId
  });

  if (order === 0) {
    return Boom.badData("Order id doesn't exist");
  }

  const offer = await Offer.findOneAndRemove({
    order_id: orderId,
    customer_id: credentials.customerId
  });

  if (!offer) {
    return Boom.badData("Offer doesn't exist");
  }

  // return fresh order for frontend
  return await aggregateOrderWithOffers(orderId, credentials);
};
