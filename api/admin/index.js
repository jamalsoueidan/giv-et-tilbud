const OrderById = require("./order_by_id");
const Orders = require("./orders");
const Users = require("./users");
const UserById = require("./user_by_id");
const Workshops = require("./workshops");
const WorkshopById = require("./workshop_by_id");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

module.exports = [
  {
    method: "GET",
    path: "/api/admin/orders/{orderId}",
    handler: OrderById,
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
    path: "/api/admin/users/{userId}",
    handler: UserById,
    options: {
      validate: {
        params: {
          userId: Joi.objectId()
        }
      }
    }
  },
  {
    method: "GET",
    path: "/api/admin/workshops/{workshopId}",
    handler: WorkshopById,
    options: {
      validate: {
        params: {
          workshopId: Joi.objectId()
        }
      }
    }
  },
  {
    method: "GET",
    path: "/api/admin/workshops",
    handler: Workshops
  }
];
