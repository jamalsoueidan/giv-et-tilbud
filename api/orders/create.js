const rp = require("request-promise");
const Order = require("../../models/order");
const getLatLng = require("../../lib/get_lat_lng");
const Boom = require("boom");

const createShopifyOrder = async (customer, properties) =>
  await rp({
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
          zip: customer.zip
        },
        fulfillment_status: "unfulfilled",
        send_receipt: true, // turn off in development
        send_fulfillment_receipt: false, //turn off in development
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
  });

module.exports = async req => {
  const payload = req.payload;
  const { customer, properties } = payload;

  try {
    const shopifyOrder = await createShopifyOrder(customer, properties);
    shopifyOrder.order.location = await getLatLng(customer);
    const mongoOrder = new Order(shopifyOrder.order);
    mongoOrder.save();

    return shopifyOrder;
  } catch (error) {
    return Boom.badData(error.message);
  }
};
