const Order = require("../../models/order");
const Offer = require("../../models/offer");
const Boom = require("boom");

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

  const countAcceptOfferes = await Offer.count({
    order_id: order.id,
    accepted: true
  });

  if (countAcceptOfferes > 0) {
    return Boom.badData("You already accepted a offer for this order!");
  }

  const offer = await Offer.findOneAndUpdate(
    {
      _id: offerId,
      order_id: order.id
    },
    {
      accepted: true,
      accepted_at: new Date()
    },
    {
      new: true
    }
  );

  return offer;
};
