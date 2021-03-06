"use strict";
const Boom = require("boom");
const Hapi = require("hapi");

require("dotenv").load();

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

//https://github.com/hapijs/inert#customized-file-response
server.ext("onPreResponse", (request, h) => {
  const response = request.response;
  if (response.isBoom && response.output.statusCode === 404) {
    return h.file("index.html");
  }

  return h.continue;
});

module.exports = async () => {
  await server.register([require("inert"), require("hapi-auth-jwt2")]);

  server.auth.strategy("jwt", "jwt", {
    key: process.env.SECRET_KEY,
    validate: async (decoded, request) => {
      if (!decoded.id) {
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
