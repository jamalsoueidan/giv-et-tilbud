const Orders = require("./api/orders");
const Offers = require("./api/offers");
const Joi = require("joi");

const defaultRoutes = [
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
    path: "/api/restricted",
    config: { auth: "jwt" },
    handler: (req, h) => {
      const response = h.response({ text: "You used a Token!" });
      response.header("Authorization", "request.headers.authorization");
      return response;
    }
  },
  {
    method: "GET",
    path: "/api/login",
    config: { auth: false },
    handler: (req, h) => {
      return "Ok";
    }
  }
];

module.exports = defaultRoutes.concat(Offers, Orders);
