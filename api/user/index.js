const rp = require("request-promise");
const Joi = require("joi");
const Boom = require("boom");
const User = require("../../models/user");
const getLatLng = require("../../lib/get_lat_lng");
const JWT = require("jsonwebtoken");

module.exports = [
  {
    method: "GET",
    path: "/api/user",
    handler: async req => {
      const credentials = req.auth.credentials;
      return await User.findOne(
        {
          _id: credentials.id
        },
        { password: 0 }
      );
    }
  },
  {
    method: "POST",
    path: "/api/user/workshops",
    handler: async req => {
      const credentials = req.auth.credentials;
      const workshop = req.payload;
      workshop.location = await getLatLng(workshop);

      return await User.findOneAndUpdate(
        {
          _id: credentials.id
        },
        {
          $push: { workshops: workshop }
        },
        {
          new: true,
          upsert: true
        }
      ).select({ password: 0 });
    },
    options: {
      validate: {
        payload: {
          name: Joi.string().required(),
          address: Joi.string().required(),
          zip: Joi.number().required(),
          city: Joi.string().required(),
          email: Joi.string()
            .email()
            .required(),
          phone: Joi.number().required()
        }
      }
    }
  },
  {
    method: "DELETE",
    path: "/api/user/workshops/{workshopId}/delete",
    handler: async req => {
      const { workshopId } = req.params;
      const credentials = req.auth.credentials;

      const user = await User.findOne({
        _id: credentials.id
      }).select({ password: 0 });

      // should we care?
      if (
        !user.workshops.some(workshop => String(workshop._id) !== workshopId)
      ) {
        return Boom.badData("No workshop with this id");
      }

      user.workshops = user.workshops.filter(
        workshop => String(workshop._id) !== workshopId
      );
      user.save();

      return user;
    },
    options: {
      validate: {
        params: {
          workshopId: Joi.string().required()
        }
      }
    }
  }
];
