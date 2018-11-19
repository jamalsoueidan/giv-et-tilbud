const User = require("../../models/user");
const Offer = require("../../models/offer");
const mongoose = require("mongoose");
const Boom = require("boom");

module.exports = async req => {
  const credentials = req.auth.credentials;

  const page = parseInt(req.query.page) || 0; //for next page pass 1 here
  const limit = parseInt(req.query.limit) || 5;

  if (!credentials.is_admin) {
    return Boom.badData("Is NOT admin");
  }

  const { workshopId } = req.params;

  const offersCount = await Offer.count({
    workshop_id: mongoose.Types.ObjectId(workshopId)
  });

  const results = {
    page: page,
    limit: limit,
    count: 0
  };

  const user = await User.findOne({
    "workshops._id": mongoose.Types.ObjectId(workshopId)
  }).lean();

  const workshop = user.workshops.find(w => w._id == workshopId);
  delete user.workshops;
  workshop.user = user;

  if (offersCount > 0) {
    const aggregate = await Offer.aggregate([
      {
        $match: {
          workshop_id: mongoose.Types.ObjectId(workshopId)
        }
      },
      { $sort: { created_at: -1 } },
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
      {
        $facet: {
          //https://stackoverflow.com/questions/20348093/mongodb-aggregation-how-to-get-total-records-count
          offers: [{ $skip: page * limit }, { $limit: limit }],
          count: [
            {
              $count: "count"
            }
          ]
        }
      }
    ]);

    const offers = aggregate[0];
    results.count = offers.count[0] ? offers.count[0].count : 0;
    workshop.offers = offers.offers;
  }

  return {
    results: workshop,
    ...results
  };
};
