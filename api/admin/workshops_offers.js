const Order = require("../../models/order");
const Offer = require("../../models/offer");
const mongoose = require("mongoose");
const Boom = require("boom");

module.exports = async req => {
  const credentials = req.auth.credentials;

  const page = parseInt(req.query.page) || 0; //for next page pass 1 here
  const limit = parseInt(req.query.limit) || 10;

  if (!credentials.is_admin) {
    return Boom.badData("Is NOT admin");
  }

  const { workshopId } = req.params;

  const aggregate = await Offer.aggregate([
    {
      $match: {
        workshop_id: mongoose.Types.ObjectId(workshopId)
      }
    },
    {
      $lookup: {
        from: "orders",
        localField: "order_id",
        foreignField: "id",
        as: "order"
      }
    },
    {
      $unwind: "$order"
    },
    { $sort: { created_at: -1 } },
    {
      $facet: {
        //https://stackoverflow.com/questions/20348093/mongodb-aggregation-how-to-get-total-records-count
        workshops: [{ $skip: page * limit }, { $limit: limit }],
        count: [
          {
            $count: "count"
          }
        ]
      }
    }
  ]);

  const workshops = aggregate[0];
  const count = workshops.count[0] ? workshops.count[0].count : 0;

  return {
    results: workshops.workshops,
    count: count,
    page: page,
    limit: limit
  };
};
