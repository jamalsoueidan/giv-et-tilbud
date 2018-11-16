const Order = require("../../models/order");
const Offer = require("../../models/offer");
const Boom = require("boom");

module.exports = async req => {
  const orderId = req.params.orderId;
  const credentials = req.auth.credentials;

  // security issue here, any person can get any order, but he needs the id of the order which consist of many number.
  // right now  this is the solution until we use geoNear and see if the current workshop is near this order.
  const order = await Order.findOne({
    id: orderId
  }).lean();

  const offer = await Offer.findOne({
    customer_id: credentials.customerId,
    order_id: orderId
  });

  if (order) {
    if (offer) {
      order.offer = offer;
    }

    if (!offer || !offer.accepted) {
      order.email = undefined;
      order.phone = undefined;
      order.token = undefined;
      order.order_status_url = undefined;
      order.shipping_address.address1 = undefined;
      order.customer.last_name = undefined;
    }

    return order;
  }
  return Boom.badData("Order id doesn't exist");
};
