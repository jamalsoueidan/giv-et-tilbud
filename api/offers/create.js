const mongoose = require("mongoose");
const Order = require("../../models/order");
const Offer = require("../../models/offer");
const User = require("../../models/user");
const Boom = require("boom");
const getDirections = require("../../lib/get_directions");
const aggregateOrderWithOffers = require("./_aggregate_order_with_offers.js");

/**
 * @todo validate if this order has been closed, and cannot receiving more offers by fulfillment_status
 */

module.exports = async req => {
  const credentials = req.auth.credentials;
  const { workshopId, properties } = req.payload;
  const { orderId } = req.params;

  const order = await Order.findOne(
    {
      id: orderId
    },
    { id: 1, location: 1 }
  );

  if (!order) {
    return Boom.badData("Order id doesn't exist");
  }

  const user = await User.findOne({
    customer_id: credentials.customerId,
    workshops: { $elemMatch: { _id: workshopId } }
  });

  if (!user) {
    return Boom.badData("Workshop id doesn't exist");
  }

  const workshop = user.workshops.find(w => w._id == workshopId);

  directions = await getDirections({ workshop, order });

  try {
    await Offer.updateOne(
      {
        order_id: order.id,
        customer_id: credentials.customerId,
        workshop_id: workshop._id,
        distance: directions.distance,
        duration: directions.duration
      },
      {
        $set: { created_at: new Date(), properties: properties }
      },
      {
        new: true,
        upsert: true
      }
    );
  } catch (errr) {
    console.log(errr);
  }

  return await aggregateOrderWithOffers(orderId, credentials);
};
