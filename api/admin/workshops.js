const User = require("../../models/user");
const Boom = require("boom");

module.exports = async req => {
  const credentials = req.auth.credentials;

  const page = parseInt(req.query.page) || 0; //for next page pass 1 here
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search || "";

  if (!credentials.is_admin) {
    return Boom.badData("Is NOT admin");
  }

  try {
    const aggregate = await User.aggregate([
      { $unwind: "$workshops" },
      {
        $addFields: {
          "workshops.customer_id": { $add: ["$customer_id"] }
        }
      },
      { $replaceRoot: { newRoot: "$workshops" } },
      {
        $match: {
          $or: [
            {
              name: {
                $regex: new RegExp(search, "ig")
              }
            },
            {
              address: {
                $regex: new RegExp(search, "ig")
              }
            },
            {
              city: {
                $regex: new RegExp(search, "ig")
              }
            },
            {
              zip: parseInt(search)
            }
          ]
        }
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
  } catch (error) {
    console.log(error);
  }
};
