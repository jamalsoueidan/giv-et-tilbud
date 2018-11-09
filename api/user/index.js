const rp = require("request-promise");
const Joi = require("joi");
const Boom = require("boom");
const User = require("../../models/user");
const getLatLng = require("../../lib/get_lat_lng");
const JWT = require("jsonwebtoken");

module.exports = [
  {
    method: "GET",
    path: "/api/workshops",
    handler: async req => {
      //https://stackoverflow.com/questions/19266590/merging-array-fields-in-mongodb-aggregation
      try {
        const workshops = await User.aggregate([
          {
            $group: { _id: "workshops", workshops: { $push: "$workshops" } }
          },

          { $unwind: "$workshops" },
          { $unwind: "$workshops" },
          {
            $group: {
              _id: "$_id",
              workshops: {
                $addToSet: "$workshops"
              }
            }
          },
          {
            $project: {
              _id: 0,
              "workshops._id": 0,
              "workshops.created_at": 0,
              "workshops.phone": 0,
              "workshops.email": 0,
              "workshops.location.type": 0
            }
          }
        ]);

        if (workshops.length > 0) {
          return workshops[0].workshops;
        } else {
          return [];
        }
      } catch (err) {
        console.log(err);
      }
    },
    options: {
      auth: false
    }
  },
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

      return await User.findOneAndUpdate(
        { _id: credentials.id },
        {
          $pull: { workshops: { _id: workshopId } }
        },
        {
          new: true
        }
      ).select({ password: 0 });
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
