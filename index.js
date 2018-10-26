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

// bring your own validation function
const validate = async function(decoded, request) {
  // do your checks to see if the person is valid
  if (!people[decoded.id]) {
    return { isValid: false };
  } else {
    return { isValid: true };
  }
};

const plugins = [require("inert"), require("hapi-auth-jwt2")];

const init = async () => {
  const port = process.env.PORT || 3000;
  const server = new Hapi.Server({
    port: port,
    routes: {
      files: {
        relativeTo: require("path").join(__dirname, "client", "build")
      },
      cors: true, // testing locally between ports
      validate: {
        failAction: async (request, h, err) => {
          //https://github.com/hapijs/hapi/issues/3706
          if (process.env.NODE_ENV === "production") {
            console.error("ValidationError:", err.message);
            throw Boom.badRequest(`Invalid request payload input`);
          } else {
            console.error(err);
            throw err;
          }
        },
        options: {
          allowUnknown: true //https://github.com/hapijs/hapi/issues/1308
        }
      }
    }
  });
  // include our module here ↓↓
  await server.register(plugins);

  server.auth.strategy("jwt", "jwt", {
    key: process.env.SECRET_KEY, // Never Share your secret key
    validate: validate, // validate function defined above
    verifyOptions: { algorithms: ["HS256"] } // pick a strong algorithm
  });

  server.auth.default("jwt");
  server.route(require("./routes.js")());
  await server.start();
  return server;
};

init()
  .then(server => {
    console.log("Server running at:", server.info.uri);
  })
  .catch(error => {
    console.log(error);
  });
