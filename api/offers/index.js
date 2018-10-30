const Joi = require("joi");
const Order = require("../../models/order");
const Offer = require("../../models/offer");
const Boom = require("boom");

/**
 * @todo validate if this order has been closed, and cannot receiving more offers by fulfillment_status
 */

module.exports = [
  {
    method: "POST",
    path: "/api/orders/{orderId}/offers",
    handler: async req => {
      const { properties } = req.payload;
      const { orderId } = req.params;

      const order = await Order.countDocuments({
        id: orderId
      });

      if (order === 0) {
        return Boom.badData("Order id doesn't exist");
      }

      const credentials = req.auth.credentials;

      const offer = await Offer.findOneAndUpdate(
        {
          orderId: orderId,
          customerId: credentials.customerId
        },
        {
          $set: { properties: properties }
        },
        {
          new: true,
          upsert: true
        }
      );

      return offer;
    },
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
  },
  {
    method: "GET",
    path: "/api/offers",
    handler: async req => {
      const payload = req.payload;
      const offers = await Offer.find({});
      return { offers };
    }
  }
];
