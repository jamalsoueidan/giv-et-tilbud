const rp = require("request-promise");
const Order = require("../../models/order");
const User = require("../../models/user");
const Boom = require("boom");

module.exports = async req => {
  const payload = req.payload;
  const credentials = req.auth.credentials;
  const workshopId = req.query.workshopid;

  const page = parseInt(req.query.page) || 0; //for next page pass 1 here
  const limit = parseInt(req.query.limit) || 5;

  const workshops = await User.find(
    { _id: credentials.id, "workshops._id": workshopId },
    { _id: 0, "workshops.$": 1 }
  );

  if (workshops.length === 0) {
    return Boom.badData("Workshop id doesn't exist!");
  }

  const coordinates = workshops[0].workshops[0].location.coordinates;

  //https://stackoverflow.com/questions/5681851/mongodb-combine-data-from-multiple-collections-into-one-how
  const aggregate = await Order.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: coordinates
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
    },
    {
      $match: {
        "orders.fulfillment_status": null
      }
    },
    {
      $facet: {
        //https://stackoverflow.com/questions/20348093/mongodb-aggregation-how-to-get-total-records-count
        orders: [{ $skip: page * limit }, { $limit: limit }],
        count: [
          {
            $count: "count"
          }
        ]
      }
    }
  ]);

  const orders = aggregate[0];
  const count = orders.count[0] ? orders.count[0].count : 0;

  return {
    results: orders.orders,
    count: count,
    page: page,
    limit: limit
  };
};
