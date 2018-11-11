const mongoose = require("mongoose");
const Order = require("../../models/order");
const Offer = require("../../models/offer");
const User = require("../../models/user");
const Boom = require("boom");
const aggregateOrderWithOffers = require("./_aggregate_order_with_offers.js");

/**
 * @todo validate if this order has been closed, and cannot receiving more offers by fulfillment_status
 */

module.exports = async req => {
  const credentials = req.auth.credentials;
  const { workshopId, properties } = req.payload;
  const { orderId } = req.params;

  const order = await Order.countDocuments({
    id: orderId
  });

  if (order === 0) {
    return Boom.badData("Order id doesn't exist");
  }

  const user = await User.findOne({
    customer_id: credentials.customerId,
    workshops: { $elemMatch: { _id: workshopId } }
  });

  if (!user) {
    return Boom.badData("Workshop id doesn't exist");
  }

  await Offer.update(
    {
      order_id: orderId,
      customer_id: credentials.customerId,
      workshop_id: workshopId
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
