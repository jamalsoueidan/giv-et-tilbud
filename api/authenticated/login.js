const Boom = require("boom");
const rp = require("request-promise");
const User = require("../../models/user");
const JWT = require("jsonwebtoken");
const shopifyEmail = require("../../lib/shopify_email");

module.exports = async (req, reply) => {
  const { email, password } = req.payload;

  //check if user have subscription from chargerabbit
  //...

  //check user exists in our local, because right now shopify only allow PLUS users to auth users.
  const user = await User.findOne({ email: email });
  if (!user) {
    return Boom.unauthorized("Bad email or password");
  }

  const credentials = {
    email: user.email,
    customerId: user.id,
    id: user._id
  };

  const token = JWT.sign(credentials, process.env.SECRET_KEY);

  return {
    ...credentials,
    workshops: user.workshops,
    token
  };
};
