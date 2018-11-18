const Joi = require("joi");
const Boom = require("boom");
const Bcrypt = require("bcrypt");
const User = require("../../models/user");
const JWT = require("jsonwebtoken");
const shopifyEmail = require("../../lib/shopify_email");

module.exports = [
  {
    method: "POST",
    path: "/api/signup",
    handler: async req => {
      //first check (key) if it exists, because each time user buy subscription gets a signup url with a key

      const { email, password } = req.payload;
      const customer = await shopifyEmail(req.payload.email);
      if (!customer) {
        return Boom.unauthorized("Email doesn't exist in shopify!");
      }

      const hashPassword = await Bcrypt.hash(password, 12);

      const newUser = new User({
        email: email,
        password: hashPassword,
        customer_id: customer.id
      });

      return await newUser.save();
    },
    options: {
      auth: false,
      validate: {
        payload: {
          email: Joi.string()
            .email()
            .required(),
          password: Joi.string()
            .min(6)
            .required()
        }
      }
    }
  }
];
