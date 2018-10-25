const createOrder = require("./api/create_order");

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
    config: { auth: false },
    handler: createOrder
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
