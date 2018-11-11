const rp = require("request-promise");

module.exports = async ({ workshop, order }) => {
  const options = {
    uri: `https://${process.env.GOOGLE_URL}/maps/api/directions/json?`,
    json: true,
    method: "GET",
    qs: {
      key: process.env.GOOGLE_KEY,
      origin: order.location.coordinates.reverse().join(","), //${customer.city}` //get list of postal code and convert to city
      destination: workshop.location.coordinates.reverse().join(","),
      language: "da"
    }
  };

  const response = await rp(options);
  const routes = response.routes;
  if (routes.length >= 0) {
    const route = routes.pop();
    const legs = route.legs.pop();
    return {
      distance: legs.distance.text,
      duration: legs.duration.text
    };
  }

  return null;
};
