"use strict";
const Hapi = require("hapi");

require("dotenv").load();

const people = {
  // our "users database"
  1: {
    id: 1,
    name: "Jen Jones"
  }
};

const token = require("jsonwebtoken").sign({ id: 1 }, process.env.SECRET_KEY, {
  algorithm: "HS256"
});

const server = new Hapi.Server({
  port: process.env.PORT || 3000,
  routes: {
    files: {
      relativeTo: require("path").join(__dirname, "client", "build")
    },
    cors: true, // testing locally between ports
    validate: {
      failAction: async (request, h, err) => {
        //https://github.com/hapijs/hapi/issues/3706
        if (process.env.NODE_ENV === "production") {
          //console.error("ValidationError:", err.message);
          throw Boom.badRequest(`Invalid request payload input`);
        } else {
          //console.error(err);
          throw err;
        }
      },
      options: {
        allowUnknown: true //https://github.com/hapijs/hapi/issues/1308
      }
    }
  }
});

module.exports = async () => {
  await server.register([require("inert"), require("hapi-auth-jwt2")]);

  server.auth.strategy("jwt", "jwt", {
    key: process.env.SECRET_KEY,
    validate: async (decoded, request) => {
      if (!people[decoded.id]) {
        return { isValid: false };
      } else {
        return { isValid: true };
      }
    },
    verifyOptions: { algorithms: ["HS256"] }
  });

  server.auth.default("jwt");
  server.route(require("./routes.js"));
  await server.start();
  return server;
};
