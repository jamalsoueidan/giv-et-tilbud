const ById = require("./by_id");
const Orders = require("./orders");
const Joi = require("joi");

module.exports = [
  {
    method: "GET",
    path: "/api/admin/orders/{orderId}",
    handler: ById,
    options: {
      validate: {
        params: {
          orderId: Joi.number().required()
        }
      }
    }
  },
  {
    method: "GET",
    path: "/api/admin/orders",
    handler: Orders
  }
];
