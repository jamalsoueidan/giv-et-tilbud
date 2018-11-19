const Order = require("../../models/order");
const Offer = require("../../models/offer");
const Boom = require("boom");

module.exports = async req => {
  const credentials = req.auth.credentials;

  const page = parseInt(req.query.page) || 0; //for next page pass 1 here
  const limit = parseInt(req.query.limit) || 10;

  const isEmpty = value => {
    if (!value) return true;
    if (value === "undefined") return true;
    if (value === "") return true;
    return false;
  };

  if (!credentials.is_admin) {
    return Boom.badData("Is NOT admin");
  }

  let match = {};

  const device = (device => {
    if (isEmpty(device)) return;
    return {
      "line_items.properties.name": "device",
      "line_items.properties.value": {
        $regex: new RegExp(device, "ig")
      }
    };
  })(req.query.device);

  if (device) {
    match["$and"] = [device];
  }

  const issue = (issue => {
    if (isEmpty(issue)) return;
    return {
      "line_items.properties.name": "issue",
      "line_items.properties.value": {
        $regex: new RegExp(issue, "ig")
      }
    };
  })(req.query.issue);

  if (issue) {
    if (match["$and"]) match["$and"].push(issue);
    else match["$and"] = [issue];
  }

  const fulfillment_status = (fulfillment_status => {
    if (isEmpty(fulfillment_status)) return;
    if (fulfillment_status === "null") {
      return {
        fulfillment_status: null
      };
    } else if (fulfillment_status === "fulfilled") {
      return {
        fulfillment_status: "fulfilled"
      };
    }
  })(req.query.fulfillment_status);

  if (fulfillment_status) {
    if (match["$and"]) match["$and"].push(fulfillment_status);
    else match["$and"] = [fulfillment_status];
  }

  const search = req.query.search;
  if (!isEmpty(search)) {
    match["$or"] = [];
    match["$or"].push({
      "shipping_address.zip": parseInt(search)
    });
    match["$or"].push({
      "shipping_address.city": {
        $regex: new RegExp(search, "ig")
      }
    });
  }

  const aggregate = await Order.aggregate([
    {
      $match: match
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
