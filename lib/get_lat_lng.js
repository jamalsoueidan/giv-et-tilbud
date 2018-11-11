const rp = require("request-promise");

module.exports = async customer => {
  const address = customer.address ? `${customer.address},` : "";

  const options = {
    uri: `https://${process.env.GOOGLE_URL}/maps/api/geocode/json?`,
    json: true,
    method: "GET",
    qs: {
      key: process.env.GOOGLE_KEY,
      address: `${customer.address}, ${customer.zip} ${customer.city}, Denmark`
    }
  };
  const response = await rp(options);
  const results = response.results;
  if (results.length >= 0) {
    const geometry = results.pop().geometry;
    return {
      coordinates: [geometry.location.lng, geometry.location.lat]
    };
  }

  return null;
};
