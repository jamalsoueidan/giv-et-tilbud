const Boom = require("boom");
const rp = require("request-promise");
const User = require("../../models/user");
const JWT = require("jsonwebtoken");

module.exports = async (req, reply) => {
  const { email, password } = req.payload;
  const options = {
    uri:
      `https://${process.env.SHOPIFY_URL}/admin/customers/search.json?query=` +
      email,
    auth: {
      user: process.env.SHOPIFY_USERNAME,
      password: process.env.SHOPIFY_PASSWORD
    },
    method: "GET"
  };
  const body = await rp(options);
  //check shopify if user exists?
  const customers = JSON.parse(body).customers;
  if (customers.length === 0) return Boom.unauthorized("Bad email or password");

  const customer = customers[0];
  //check if user have subscription from chargerabbit
  //...

  //check user exists in our local, because right now shopify only allow PLUS users to auth users.
  const user = await User.findOne({ email: email });
  if (!user) {
    return Boom.unauthorized("Bad email or password");
  }

  const credentials = {
    email: user.email,
    customerId: customer.id,
    id: user._id
  };

  const token = JWT.sign(credentials, process.env.SECRET_KEY);

  return { ...credentials, token };
};
