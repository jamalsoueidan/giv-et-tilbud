const Joi = require("joi");
const Order = require("../../models/order");
const Cancel = require("./cancel");
const Create = require("./create");
/**
 * @todo validate if this order has been closed, and cannot receiving more offers by fulfillment_status
 */

module.exports = [
  {
    method: "GET",
    path: "/api/offers",
    handler: async req => {
      const token = req.query.token;
      const key = req.query.key;

      const orders = await Order.aggregate([
        {
          $match: {
            $and: [
              {
                token: token
              },
              {
                order_status_url: {
                  $regex: new RegExp(key, "ig")
                }
              }
            ]
          }
        },
        {
          $lookup: {
            from: "offers",
            localField: "id",
            foreignField: "orderId",
            as: "offers"
          }
        },
        {
          $project: {
            _id: 0,
            token: 0,
            order_status_url: 0
          }
        }
      ]);

      return orders;
    },
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
