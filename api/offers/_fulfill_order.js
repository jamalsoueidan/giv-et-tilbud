const rp = require("request-promise");

const getLocations = async () =>
  await rp({
    uri: `https://${process.env.SHOPIFY_URL}/admin/locations.json`,
    auth: {
      user: process.env.SHOPIFY_USERNAME,
      password: process.env.SHOPIFY_PASSWORD
    },
    json: true,
    method: "GET"
  });

module.exports = async (order, notify_customer) => {
  const { locations } = await getLocations();

  options = {
    orderId: order.id,
    locationId: locations[0].id,
    lineItemId: order.line_items[0].id,
    notify_customer: notify_customer
  };

  await rp({
    uri: `https://${process.env.SHOPIFY_URL}/admin/orders/${
      options.orderId
    }/fulfillments.json`,
    auth: {
      user: process.env.SHOPIFY_USERNAME,
      password: process.env.SHOPIFY_PASSWORD
    },
    json: true,
    method: "POST",
    body: {
      fulfillment: {
        location_id: options.locationId,
        tracking_number: null,
        line_items: [{ id: options.lineItemId }],
        notify_customer: options.notify_customer
      }
    }
  });

  order.fulfillment_status = "fulfilled";
  order.save();
};
