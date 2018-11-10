const Order = require("../../models/order");
const Offer = require("../../models/offer");
const OffersClean = require("../../lib/offers_clean");

module.exports = async (orderId, credentials) => {
  const orders = await Order.aggregate([
    {
      $match: {
        id: orderId
      }
    },
    {
      $lookup: {
        from: "offers",
        localField: "id",
        foreignField: "orderId",
        as: "offers"
      }
    }
  ]);

  return OffersClean(orders, credentials).pop();
};
