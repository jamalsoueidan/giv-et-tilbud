const Offer = require("../../models/offer");

module.exports = async req => {
  const credentials = req.auth.credentials;

  const results = await Offer.aggregate([
    {
      $match: {
        accepted: true,
        customer_id: credentials.customerId
      }
    },
    { $sort: { accepted_at: -1 } },
    {
      $addFields: {
        offer: "$$ROOT"
      }
    },
    {
      $lookup: {
        from: "orders",
        localField: "order_id",
        foreignField: "id",
        as: "orders"
      }
    },
    {
      $unwind: "$orders"
    },
    {
      $addFields: {
        "orders.offer": "$offer"
      }
    },
    {
      $replaceRoot: {
        newRoot: "$orders"
      }
    },
    {
      $project: {
        token: 0,
        order_status_url: 0
      }
    },
    { $limit: 5 }
  ]);

  return {
    results: results,
    count: results.length
  };
};
