const Create = require("./create");
const Incoming = require("./incoming");
const Outgoing = require("./outgoing");
const Accepted = require("./accepted");
const ById = require("./by_id");
const Order = require("../../models/order");
const Joi = require("joi");

module.exports = [
  {
    method: "GET",
    path: "/api/orders/{orderId}",
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
    path: "/api/orders/incoming",
    handler: Incoming
  },
  {
    method: "GET",
    path: "/api/orders/outgoing",
    handler: Outgoing
  },
  {
    method: "GET",
    path: "/api/orders/accepted",
    handler: Accepted
  },
  {
    method: "POST",
    path: "/api/orders",
    handler: Create,
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
              .min(2),
            last_name: Joi.string()
              .required()
              .min(2)
          }
        }
      }
    }
  }
];
