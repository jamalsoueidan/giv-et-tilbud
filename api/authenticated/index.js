const rp = require("request-promise");
const Joi = require("joi");
const Boom = require("boom");
const User = require("../../models/user");
const JWT = require("jsonwebtoken");
const IsAuthenticated = require("./is_authenticated");
const Login = require("./login");

module.exports = [
  {
    method: "POST",
    path: "/api/isAuthenticated",
    handler: IsAuthenticated
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
    handler: Login,
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
