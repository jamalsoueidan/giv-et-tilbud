const Hapi = require('hapi');
const jwt = require('jsonwebtoken');
const Path = require('path');

require('dotenv').load();

const people = { // our "users database"
    1: {
      id: 1,
      name: 'Jen Jones'
    }
};

const token = jwt.sign({ id: 1 }, process.env.SECRET_KEY, { algorithm: 'HS256'});

// bring your own validation function
const validate = async function (decoded, request) {
    // do your checks to see if the person is valid
    if (!people[decoded.id]) {
      return { isValid: false };
    }
    else {
      return { isValid: true };
    }
};

const routes = [
  {
    method: 'GET',
    path: '/{param*}',
    config: { auth: false },
    handler: {
      directory: {
        path: '.',
        redirectToSlash: true,
        index: true,
      }
    }
  },
  {
    method: "GET", path: "/api", config: { auth: false },
    handler: (request) => {
      return {text: 'Token not required'};
    }
  },
  {
    method: 'GET', path: '/api/restricted', config: { auth: 'jwt' },
    handler: (req, h) => {
      const response = h.response({text: 'You used a Token!'});
      response.header('Authorization', 'request.headers.authorization');
      return response;
    }
  },
  {
    method: "POST", path: '/api/login', config: { auth: false },
    handler: (req, h) => {
      const payload = req.payload
      return "Ok"
    }
  }
]

const plugins = [
  require('inert'),
  require('hapi-auth-jwt2')
]

const init = async () => {
  const port = process.env.PORT || 3000;
  const server = new Hapi.Server({
    port: port,
    routes: {
        files: {
            relativeTo: Path.join(__dirname, 'client', 'build')
        },
        cors: true // testing locally between ports
    }
  });
  // include our module here ↓↓
  await server.register(plugins);

  server.auth.strategy('jwt', 'jwt', {
    key: process.env.SECRET_KEY,          // Never Share your secret key
    validate: validate,            // validate function defined above
    verifyOptions: { algorithms: [ 'HS256' ] } // pick a strong algorithm
  });

  server.auth.default('jwt');
  server.route(routes);
  await server.start();
  return server;
};


init().then(server => {
  console.log('Server running at:', server.info.uri);
})
.catch(error => {
  console.log(error);
});
