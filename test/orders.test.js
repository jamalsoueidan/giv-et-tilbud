const test = require("ava");
const Server = require("../server");
const Database = require("../database");

test.before(async t => {
  t.context.server = await Server();
  t.context.database = await Database();
});

test("/api/login should return 200 status", async t => {
  const response = await t.context.server.inject({
    method: "GET",
    url: "/api/login"
  });

  t.is(response.statusCode, 200);
});

test("it should create new order", async t => {
  const response = await t.context.server.inject({
    method: "POST",
    url: "/api/orders",
    payload: JSON.stringify({
      customer: {
        email: "asd@gmail.com",
        phone: "20 51 75 95",
        city: "Aarhus",
        zip: "8000",
        first_name: "jamal",
        last_name: "soueidan"
      },
      properties: [
        {
          name: "custom engraving",
          value: "Happy Birthday Mom!"
        }
      ]
    })
  });

  t.is(response.statusCode, 200);
});

test("it should fail without email when creating new order", async t => {
  const response = await t.context.server.inject({
    method: "POST",
    url: "/api/orders",
    payload: JSON.stringify({
      customer: {
        phone: "20 51 75 95",
        city: "Aarhus",
        zip: "8000",
        first_name: "jamal",
        last_name: "soueidan"
      },
      properties: [
        {
          name: "custom engraving",
          value: "Happy Birthday Mom!"
        }
      ]
    })
  });

  t.is(response.statusCode, 400);
});

test.after.always("guaranteed cleanup", async t => {
  await t.context.database.disconnect();
  await t.context.server.stop();
});
