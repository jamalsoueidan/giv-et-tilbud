const Joi = require("joi");
const Cancel = require("./cancel");
const Create = require("./create");
const Offers = require("./offers");

module.exports = [
  {
    method: "GET",
    path: "/api/offers",
    handler: Offers,
    options: {
      auth: false,
      validate: {
        query: {
          token: Joi.string()
            .min(15)
            .required(),
          key: Joi.string()
            .min(15)
            .required()
        }
      }
    }
  },
  {
    method: "POST",
    path: "/api/orders/{orderId}/offers/cancel",
    handler: Cancel,
    options: {
      validate: {
        params: {
          orderId: Joi.number()
            .positive()
            .precision(2)
            .required()
        }
      }
    }
  },
  {
    method: "POST",
    path: "/api/orders/{orderId}/offers",
    handler: Create,
    options: {
      validate: {
        payload: {
          workshopId: Joi.string().required(),
          properties: Joi.array()
            .min(1)
            .items({
              name: Joi.string().required(),
              value: Joi.string().required()
            })
        },
        params: {
          orderId: Joi.number()
            .positive()
            .precision(2)
            .required()
        }
      }
    }
  }
];
