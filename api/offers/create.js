const Order = require("../../models/order");
const Offer = require("../../models/offer");
const Boom = require("boom");
const aggregateOrderWithOffers = require("./_aggregate_order_with_offers.js");

module.exports = async req => {
  const credentials = req.auth.credentials;
  const { properties } = req.payload;
  const { orderId } = req.params;

  const order = await Order.countDocuments({
    id: orderId
  });

  if (order === 0) {
    return Boom.badData("Order id doesn't exist");
  }

  await Offer.update(
    {
      orderId: orderId,
      customerId: credentials.customerId
    },
    {
      $set: { created_at: new Date(), properties: properties }
    },
    {
      new: true,
      upsert: true
    }
  );

  return await aggregateOrderWithOffers(orderId, credentials);
};
