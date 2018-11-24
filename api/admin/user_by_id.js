const mongoose = require("mongoose");
const User = require("../../models/user");
const Boom = require("boom");

module.exports = async req => {
  const credentials = req.auth.credentials;

  const page = parseInt(req.query.page) || 0; //for next page pass 1 here
  const limit = parseInt(req.query.limit) || 10;
  const userId = req.params.userId;

  if (!credentials.is_admin) {
    return Boom.badData("Is NOT admin");
  }

  const user = await User.findOne({
    _id: mongoose.Types.ObjectId(userId)
  });

  return user;
};
