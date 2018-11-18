const Order = require("../../models/order");
const Offer = require("../../models/offer");
const Boom = require("boom");

module.exports = async req => {
  const orderId = req.params.orderId;
  const credentials = req.auth.credentials;

  if (!credentials.is_admin) {
    return Boom.badData("Is NOT admin");
  }

  const aggregate = await Order.aggregate([
    {
      $match: {
        id: orderId
      }
    },
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
        "offers.users.workshops": 0
      }
    }
  ]);

  if (aggregate.length > 0) {
    return aggregate[0];
  } else {
    return Boom.badData("Order not found");
  }
};
