const rp = require("request-promise");
const Joi = require("joi");
const Boom = require("boom");
const User = require("../../models/user");
const JWT = require("jsonwebtoken");

module.exports = [
  {
    method: "POST",
    path: "/api/isAuthenticated",
    config: { auth: "jwt" },
    handler: async (req, h) => {
      const token = req.headers["authorization"].split(" ")[1];
      const decoded = JWT.verify(token, process.env.SECRET_KEY);
      return {
        ...decoded,
        token
      };
    }
  },
  {
    method: "GET",
    path: "/api/logout",
    handler: async (req, h) => {
      // JWT should be connected with REDIS to validate the tokens, so we can create logout!
      return {};
    }
  },
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
      const customers = JSON.parse(body).customers;
      if (customers.length === 0)
        return Boom.unauthorized("Bad email or password");

      const customer = customers[0];
      //check if user have subscription from chargerabbit
      //...

      //check user exists in our local, because right now shopify only allow PLUS users to auth users.
      const user = await User.findOne({ email: email });
      if (!user) {
        return Boom.unauthorized("Bad email or password");
      }

      const response = {
        email: user.email,
        customerId: customer.id,
        id: user._id
      };

      const token = JWT.sign(response, process.env.SECRET_KEY);
      return { ...response, token };
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
