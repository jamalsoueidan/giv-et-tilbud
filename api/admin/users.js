const User = require("../../models/user");
const Boom = require("boom");

module.exports = async req => {
  const credentials = req.auth.credentials;

  const page = parseInt(req.query.page) || 0; //for next page pass 1 here
  const limit = parseInt(req.query.limit) || 10;

  if (!credentials.is_admin) {
    return Boom.badData("Is NOT admin");
  }

  try {
    const aggregate = await User.aggregate([
      { $sort: { created_at: -1 } },
      {
        $facet: {
          //https://stackoverflow.com/questions/20348093/mongodb-aggregation-how-to-get-total-records-count
          users: [{ $skip: page * limit }, { $limit: limit }],
          count: [
            {
              $count: "count"
            }
          ]
        }
      }
    ]);

    const users = aggregate[0];
    const count = users.count[0] ? users.count[0].count : 0;

    return {
      results: users.users,
      count: count,
      page: page,
      limit: limit
    };
  } catch (error) {
    console.log(error);
  }
};
