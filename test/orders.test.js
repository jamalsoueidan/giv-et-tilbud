const Server = require("../server");
const Database = require("../database");

let server, database;

beforeAll(async () => {
  server = await Server();
  database = await Database();
});

function sum(a, b) {
  return a + b;
}

test("/api/login should return 200 status", async () => {
  const response = await server.inject({
    method: "GET",
    url: "/api/login"
  });

  expect(response.statusCode).toBe(200);
});

afterAll(async () => {
  await server.stop();
  await database.connection.close();
});
