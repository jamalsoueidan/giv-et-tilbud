const rp = require("request-promise");
const Order = require("../../models/order");

module.exports = async req => {
  const payload = req.payload;

  //https://stackoverflow.com/questions/5681851/mongodb-combine-data-from-multiple-collections-into-one-how
  const orders = await Order.aggregate([
    {
      $lookup: {
        from: "offers",
        localField: "orderId",
        foreignField: "id",
        as: "offers"
      }
    }
  ]);

  return { orders };
};
