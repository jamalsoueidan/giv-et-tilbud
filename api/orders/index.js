const Create = require("./create");
const Receive = require("./receive");
const Joi = require("joi");

module.exports = [
  {
    method: "GET",
    path: "/api/orders",
    handler: Receive,
    options: { auth: false }
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
  }
];
