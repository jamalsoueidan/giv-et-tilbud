const Create = require("./create");
const Incoming = require("./incoming");
const Outgoing = require("./outgoing");
const Order = require("../../models/order");
const Joi = require("joi");

module.exports = [
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
              .alphanum()
              .min(2),
            last_name: Joi.string()
              .required()
              .alphanum()
              .min(2)
          }
        }
      }
    }
  }
];
