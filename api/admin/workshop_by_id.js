const User = require("../../models/user");
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

  const offersCount = await Offer.count({
    workshop_id: mongoose.Types.ObjectId(workshopId)
  });

  if (offersCount === 0) {
    const user = await User.findOne({
      "workshops._id": mongoose.Types.ObjectId(workshopId)
    }).lean();

    return user.workshops.find(w => w._id == workshopId);
  }

  const aggregate = await User.aggregate([
    {
      $match: {
        "workshops._id": mongoose.Types.ObjectId(workshopId)
      }
    },
    { $unwind: "$workshops" },
    { $replaceRoot: { newRoot: "$workshops" } },
    {
      $match: {
        _id: mongoose.Types.ObjectId(workshopId)
      }
    },
    //check if this workshop have offers, so we dont need to do the rest of the pipeline?
    {
      $lookup: {
        from: "offers",
        localField: "_id",
        foreignField: "workshop_id",
        as: "offers"
      }
    },
    {
      $unwind: "$offers"
    },
    {
      $lookup: {
        from: "orders",
        localField: "offers.order_id",
        foreignField: "id",
        as: "offers.order"
      }
    },
    {
      $unwind: "$offers.order"
    },
    {
      $group: {
        _id: "$_id",
        name: { $first: "$name" },
        address: { $first: "$address" },
        zip: { $first: "$zip" },
        city: { $first: "$city" },
        email: { $first: "$email" },
        phone: { $first: "$phone" },
        vat: { $first: "$vat" },
        created_at: { $first: "$created_at" },
        location: { $first: "$location" },
        offers: { $push: "$offers" }
      }
    }
  ]);

  if (aggregate.length > 0) {
    return aggregate[0];
  } else {
    return Boom.badData("Workshop does not exist!");
  }
};
