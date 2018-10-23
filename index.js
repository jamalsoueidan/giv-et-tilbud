const Hapi = require('hapi');
const jwt = require('jsonwebtoken');
require('dotenv').load();

const people = { // our "users database"
    1: {
      id: 1,
      name: 'Jen Jones'
    }
};

const token = jwt.sign({ id: 1 }, process.env.SECRET_KEY, { algorithm: 'HS256'});
console.log(token)

// bring your own validation function
const validate = async function (decoded, request) {
  console.log(decoded)
    // do your checks to see if the person is valid
    if (!people[decoded.id]) {
      return { isValid: false };
    }
    else {
      return { isValid: true };
    }
};

const init = async () => {
  const port = process.env.PORT || 8080;
  const server = new Hapi.Server({ port: port });
  // include our module here ↓↓
  await server.register(require('hapi-auth-jwt2'));

  server.auth.strategy('jwt', 'jwt',
  { key: process.env.SECRET_KEY,          // Never Share your secret key
    validate: validate,            // validate function defined above
    verifyOptions: { algorithms: [ 'HS256' ] } // pick a strong algorithm
  });

  server.auth.default('jwt');

  server.route([
    {
      method: "GET", path: "/", config: { auth: false },
      handler: (request) => {
        return {text: 'Token not required'};
      }
    },
    {
      method: 'GET', path: '/restricted', config: { auth: 'jwt' },
      handler: (req, h) => {
        const response = h.response({text: 'You used a Token!'});
        response.header('Authorization', 'request.headers.authorization');
        return response;
      }
    },
    {
      method: "POST", path: '/data', config: { auth: false },
      handler: (req, h) => {
        const payload = req.payload
        return "Ok"
      }
    }
  ]);
  await server.start();
  return server;
};


init().then(server => {
  console.log('Server running at:', server.info.uri);
})
.catch(error => {
  console.log(error);
});
