const rp = require("request-promise");
const Joi = require("joi");
const Boom = require("boom");
const User = require("../../models/user");
const JWT = require("jsonwebtoken");

module.exports = [
  {
    method: "POST",
    path: "/api/login",
    handler: async (req, reply) => {
      const { email, password } = req.payload;
      const options = {
        uri:
          `https://${
            process.env.SHOPIFY_URL
          }/admin/customers/search.json?query=` + email,
        auth: {
          user: process.env.SHOPIFY_USERNAME,
          password: process.env.SHOPIFY_PASSWORD
        },
        method: "GET"
      };
      const body = await rp(options);
      //check shopify if user exists?
      const customers = JSON.parse(body);
      if (customers.length === 0)
        return Boom.unauthorized("Bad email or password");

      //check if user have subscription from chargerabbit
      //...

      //check user exists in our local, because right now shopify only allow PLUS users to auth users.
      const user = await User.findOne({ email: email });
      if (!user) {
        return Boom.unauthorized("Bad email or password");
      }

      const token = JWT.sign(
        { email: user.email, _id: user._id },
        process.env.SECRET_KEY
      );
      return { token, email };
    },
    options: {
      auth: false,
      validate: {
        payload: {
          email: Joi.string()
            .email()
            .required(),
          password: Joi.string()
            .min(2)
            .max(200)
            .required()
        }
      }
    }
  }
];
