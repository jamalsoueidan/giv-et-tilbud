const createOrder = require("./api/create_order");
const Joi = require("joi");

module.exports = () => [
  {
    method: "GET",
    path: "/{param*}",
    config: { auth: false },
    handler: {
      directory: {
        path: ".",
        redirectToSlash: true,
        index: true
      }
    }
  },
  {
    method: "GET",
    path: "/api",
    config: { auth: false },
    handler: request => {
      return { text: "Token not required" };
    }
  },
  {
    method: "GET",
    path: "/api/restricted",
    config: { auth: "jwt" },
    handler: (req, h) => {
      const response = h.response({ text: "You used a Token!" });
      response.header("Authorization", "request.headers.authorization");
      return response;
    }
  },
  {
    method: "POST",
    path: "/api/createOrder",
    handler: createOrder,
    options: {
      auth: false,
      validate: {
        payload: {
          customer: {
            email: Joi.string()
              .email()
              .required(),
            first_name: Joi.string()
              .required()
              .alphanum()
              .min(3)
              .max(30),
            last_name: Joi.string()
              .required()
              .alphanum()
              .min(3)
              .max(30)
          }
        }
      }
    }
  },
  {
    method: "POST",
    path: "/api/login",
    config: { auth: false },
    handler: (req, h) => {
      const payload = req.payload;
      return "Ok";
    }
  }
];
