const rp = require("request-promise");

module.exports = async email => {
  const options = {
    uri:
      `https://${process.env.SHOPIFY_URL}/admin/customers/search.json?query=` +
      email,
    auth: {
      user: process.env.SHOPIFY_USERNAME,
      password: process.env.SHOPIFY_PASSWORD
    },
    method: "GET"
  };
  const body = await rp(options);
  //check shopify if user exists?
  const customers = JSON.parse(body).customers;
  if (customers.length === 0) return null;
  return customers[0];
};
