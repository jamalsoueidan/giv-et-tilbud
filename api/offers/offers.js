const Order = require("../../models/order");
const Boom = require("boom");

module.exports = async req => {
  const token = req.query.token;
  const key = req.query.key;

  const orders = await Order.aggregate([
    {
      $match: {
        $and: [
          {
            token: token
          },
          {
            order_status_url: {
              $regex: new RegExp(key, "ig")
            }
          }
        ]
      }
    },
    //https://stackoverflow.com/questions/52712240/how-to-do-nested-lookup-search-in-mongodb
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
        customer: { $first: "$customer" },
        offers: { $push: "$offers" }
      }
    },
    {
      $project: {
        _id: 0,
        token: 0,
        order_status_url: 0,
        "offers.users": 0
      }
    }
  ]);

  if (orders.length === 0) {
    return Boom.badData();
  }

  return orders.pop();
};
