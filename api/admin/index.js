const ById = require("./by_id");
const Orders = require("./orders");
const Users = require("./users");
const Workshops = require("./workshops");
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
  },
  {
    method: "GET",
    path: "/api/admin/users",
    handler: Users
  },
  {
    method: "GET",
    path: "/api/admin/workshops",
    handler: Workshops
  }
];
