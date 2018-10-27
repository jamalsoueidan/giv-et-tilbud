const rp = require("request-promise");
const Order = require("../../models/order");

module.exports = async req => {
  const payload = req.payload;
  const orders = await Order.find({});
  return { orders };
};
