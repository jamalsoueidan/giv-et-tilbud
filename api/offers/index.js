const Joi = require("joi");
const Order = require("../../models/order");

/**
 * @todo validate that this order has been closed, and not receiving more offers by fulfillment_status
 */

module.exports = [
  {
    method: "POST",
    path: "/api/orders/{orderId}/offers",
    handler: async req => {
      const payload = req.payload;
      const properties = payload.properties;
      const user = 435;

      const order = await Order.findOne({
        id: req.params.orderId
      });

      if (!order.offers.some(e => e.user === user)) {
        order.offers.push({
          user: user,
          properties: payload.properties
        });
      } else {
        order.offers.map(o => {
          if (o.user === user) {
            o.properties = payload.properties;
          }
          return o;
        });
      }

      order.save();
      return order;
    },
    options: {
      auth: false,
      validate: {
        payload: {
          properties: Joi.array()
            .min(1)
            .items({
              name: Joi.string().required(),
              value: Joi.string().required()
            })
        }
      }
    }
  }
];
