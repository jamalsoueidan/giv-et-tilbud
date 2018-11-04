const Joi = require("joi");
const Boom = require("boom");
const User = require("../../models/user");
const JWT = require("jsonwebtoken");

module.exports = [
  {
    method: "POST",
    path: "/api/signup",
    handler: async req => {
      //first check key in signup after owner buy subscription on shopify!

      const newUser = new User(req.payload);
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
