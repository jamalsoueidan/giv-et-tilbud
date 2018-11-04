const Orders = require("./api/orders");
const Offers = require("./api/offers");
const Authenticated = require("./api/authenticated");
const User = require("./api/user");
const Signup = require("./api/signup");
const Joi = require("joi");

const defaultRoutes = [
  {
    method: "GET",
    path: "/{param*}",
    config: { auth: false },
    handler: {
      directory: {
        path: ".",
        redirectToSlash: true,
        index: true
      }
    }
  },
  {
    /**
     * @todo Integere this API with chargerabbit
     * https://charge-rabbit.readme.io/docs/get-subscriptions
     */
    method: "GET",
    path: "/api/customers/{customer_id}",
    config: { auth: false },
    handler: (req, h) => {
      return {
        id: 12345,
        subscriptions: [
          {
            id: 123,
            plan_name: "Test Subscription",
            amount: "$30.00",
            interval: "month",
            variant: {
              id: 6789
            }
          }
        ]
      };
    }
  }
];

module.exports = defaultRoutes.concat(
  Offers,
  Orders,
  Authenticated,
  User,
  Signup
);
