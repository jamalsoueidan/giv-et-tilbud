const rp = require("request-promise");
const Order = require("../../models/order");
const User = require("../../models/user");
const Boom = require("boom");

module.exports = async req => {
  const payload = req.payload;
  const credentials = req.auth.credentials;
  const workshopId = req.query.workshopid;

  const workshops = await User.find(
    { _id: credentials.id, "workshops._id": workshopId },
    { _id: 0, "workshops.$": 1 }
  );

  if (workshops.length === 0) {
    return Boom.badData("Workshop id doesn't exist!");
  }

  const coordinates = workshops[0].workshops[0].location.coordinates;

  //https://stackoverflow.com/questions/5681851/mongodb-combine-data-from-multiple-collections-into-one-how
  const orders = await Order.aggregate([
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
    }
  ]);

  return { orders };
};
