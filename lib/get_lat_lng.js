const rp = require("request-promise");

module.exports = async customer => {
  const address = customer.address ? `${customer.address},` : "";

  const options = {
    uri: `https://${process.env.OPENCAGEDATA_URL}/json`,
    json: true,
    method: "GET",
    qs: {
      key: process.env.OPENCAGEDATA_KEY,
      q: `${address} ${customer.zip}, Denmark` //${customer.city}` //get list of postal code and convert to city
    }
  };
  const response = await rp(options);
  if (response.results.length >= 0) {
    const geometry = response.results[0].geometry;
    return {
      coordinates: [geometry.lng, geometry.lat]
    };
  }

  return null;
};