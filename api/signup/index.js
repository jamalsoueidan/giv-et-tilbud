const Joi = require("joi");
const Boom = require("boom");
const User = require("../../models/user");
const JWT = require("jsonwebtoken");
const shopifyEmail = require("../../lib/shopify_email");

module.exports = [
  {
    method: "POST",
    path: "/api/signup",
    handler: async req => {
      //first check (key) if it exists, because each time user buy subscription gets a signup url with a key
      const customer = await shopifyEmail(req.payload.email);
      if (!customer) {
        return Boom.unauthorized("Email doesn't exist in shopify!");
      }

      const newUser = new User(req.payload);
      newUser.customer_id = customer.id;
      return await newUser.save();
    },
    options: {
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
