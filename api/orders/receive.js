const rp = require("request-promise");
const Order = require(`./model`);

module.exports = async req => {
  const payload = req.payload;
  const orders = await Order.find({});
  return { orders };
};
