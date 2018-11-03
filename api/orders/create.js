const rp = require("request-promise");
const Order = require("../../models/order");
const Boom = require("boom");

const createShopifyOrder = async (customer, properties) => {
  const options = {
    uri: `https://${process.env.SHOPIFY_URL}/admin/orders.json`,
    auth: {
      user: process.env.SHOPIFY_USERNAME,
      password: process.env.SHOPIFY_PASSWORD
    },
    json: true,
    method: "POST",
    body: {
      order: {
        email: customer.email,
        phone: customer.phone,
        customer: {
          email: customer.email,
          accepts_marketing: true,
          first_name: customer.first_name,
          last_name: customer.last_name
        },
        shipping_address: {
          first_name: customer.first_name,
          last_name: customer.last_name,
          address1: customer.address || "---",
          phone: customer.phone,
          city: customer.city || "---",
          country: "DK",
          zip: customer.zip,
          latitude: customer.latitude,
          longitude: customer.longitude
        },
        fulfillment_status: "unfulfilled",
        send_receipt: true,
        send_fulfillment_receipt: true,
        line_items: [
          {
            product_id: process.env.SHOPIFY_PRODUCT_ID,
            variant_id: process.env.SHOPIFY_VARIANT_ID,
            quantity: 1,
            properties
          }
        ]
      }
    }
  };
  return await rp(options);
};

const getGeoLocation = async customer => {
  const address = customer.address ? `${customer.address},` : "";
  const options = {
    uri: `https://${process.env.OPENCAGEDATA_URL}/json`,
    json: true,
    method: "GET",
    qs: {
      key: process.env.OPENCAGEDATA_KEY,
      q: `${address} ${customer.zip}` //${customer.city}` //get list of postal code and convert to city
    }
  };
  return await rp(options);
};

module.exports = async req => {
  const payload = req.payload;
  const { customer, properties } = payload;

  const geoLocation = await getGeoLocation(customer);
  if (geoLocation.results.length >= 0) {
    const geometry = geoLocation.results[0].geometry;
    customer.latitude = geometry.lat;
    customer.longitude = geometry.lng;
  }

  try {
    const shopifyOrder = await createShopifyOrder(customer, properties);
    const mongoOrder = new Order(shopifyOrder.order);
    mongoOrder.save();
    return shopifyOrder;
  } catch (error) {
    return Boom.badData(error.message);
  }
};
