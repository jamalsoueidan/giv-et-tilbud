const Order = require("../../models/order");
const OffersClean = require("../../lib/offers_clean");

module.exports = async req => {
  const payload = req.payload;
  const credentials = req.auth.credentials;

  const page = parseInt(req.query.page) || 0; //for next page pass 1 here
  const limit = parseInt(req.query.limit) || 5;
  const fulfillment_status =
    req.query.fulfillment_status === "fulfilled" ? "fulfilled" : null;

  //https://stackoverflow.com/questions/38954687/how-to-apply-condition-on-lookup-result-in-mongodb
  const aggregate = await Order.aggregate([
    {
      $lookup: {
        from: "offers",
        localField: "id",
        foreignField: "order_id",
        as: "offers"
      }
    },
    {
      $match: {
        "offers.customer_id": credentials.customerId,
        "orders.fulfillment_status": fulfillment_status
      }
    },
    {
      $project: {
        token: 0,
        order_status_url: 0
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
  const results = OffersClean(orders.orders, credentials);

  return {
    results: results,
    count: count,
    page: page,
    limit: limit
  };
};
