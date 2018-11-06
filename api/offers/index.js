const Joi = require("joi");
const Order = require("../../models/order");
const Offer = require("../../models/offer");
const Boom = require("boom");

/**
 * @todo validate if this order has been closed, and cannot receiving more offers by fulfillment_status
 */

const aggregateOrderWithOffers = async orderId => {
  const orders = await Order.aggregate([
    {
      $match: {
        id: orderId
      }
    },
    {
      $lookup: {
        from: "offers",
        localField: "id",
        foreignField: "orderId",
        as: "offers"
      }
    }
  ]);

  return orders.pop();
};

module.exports = [
  {
    method: "POST",
    path: "/api/orders/{orderId}/offers/cancel",
    handler: async req => {
      const { orderId } = req.params;

      const order = await Order.countDocuments({
        id: orderId
      });

      if (order === 0) {
        return Boom.badData("Order id doesn't exist");
      }

      const credentials = req.auth.credentials;

      const offer = await Offer.findOneAndRemove({
        orderId: orderId,
        customerId: credentials.customerId
      });

      if (!offer) {
        return Boom.badData("Offer doesn't exist");
      }

      // return fresh order for frontend
      return await aggregateOrderWithOffers(orderId);
    },
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

      await Offer.update(
        {
          orderId: orderId,
          customerId: credentials.customerId
        },
        {
          $set: { created_at: new Date(), properties: properties }
        },
        {
          new: true,
          upsert: true
        }
      );

      return await aggregateOrderWithOffers(orderId);
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
  }
];
