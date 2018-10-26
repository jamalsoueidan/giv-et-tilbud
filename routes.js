const Order = require("./api/orders");
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
    method: "POST",
    path: "/api/login",
    config: { auth: false },
    handler: (req, h) => {
      const payload = req.payload;
      return "Ok";
    }
  }
];

module.exports = defaultRoutes.concat(Order);
