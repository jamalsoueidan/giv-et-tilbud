const rp = require("request-promise");
const Order = require("../../models/order");

module.exports = async req => {
  const payload = req.payload;

  //https://stackoverflow.com/questions/5681851/mongodb-combine-data-from-multiple-collections-into-one-how
  const orders = await Order.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [10.131774, 56.159447]
        },
        distanceField: "distance",
        spherical: true,
        maxDistance: 10000
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

  return { orders };
};
