const Order = require("../../models/order");
const Offer = require("../../models/offer");
const Boom = require("boom");

module.exports = async req => {
  const credentials = req.auth.credentials;

  const page = parseInt(req.query.page) || 0; //for next page pass 1 here
  const limit = parseInt(req.query.limit) || 10;

  if (!credentials.is_admin) {
    return Boom.badData("Is NOT admin");
  }

  const aggregate = await Order.aggregate([
    {
      $lookup: {
        from: "offers",
        let: { order_id: "$id" },
        pipeline: [
          { $match: { $expr: { $eq: ["$order_id", "$$order_id"] } } },
          {
            $lookup: {
              from: "users",
              let: { customer_id: "$customer_id" },
              pipeline: [
                {
                  $match: {
                    $expr: { $eq: ["$customer_id", "$$customer_id"] }
                  }
                }
              ],
              as: "users"
            }
          }
        ],
        as: "offers"
      }
    },
    {
      $unwind: "$offers"
    },
    {
      $unwind: "$offers.users"
    },
    {
      $unwind: "$offers.users.workshops"
    },
    {
      $match: {
        $expr: {
          $eq: ["$offers.workshop_id", "$offers.users.workshops._id"]
        }
      }
    },
    {
      $addFields: {
        "offers.workshop": "$offers.users.workshops"
      }
    },
    {
      $group: {
        _id: "$_id",
        id: { $first: "$id" },
        location: { $first: "$location" },
        email: { $first: "$email" },
        created_at: { $first: "$created_at" },
        phone: { $first: "$phone" },
        fulfillment_status: { $first: "$fulfillment_status" },
        line_items: { $first: "$line_items" },
        shipping_address: { $first: "$shipping_address" },
        token: { $first: "$token" },
        order_status_url: { $first: "$order_status_url" },
        customer: { $first: "$customer" },
        offers: { $push: "$offers" }
      }
    },
    {
      $project: {
        "offers.users.workshops": 0
      }
    },
    { $sort: { created_at: -1 } },
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
