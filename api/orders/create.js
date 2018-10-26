const rp = require("request-promise");
const Order = require(`./model`);

module.exports = async req => {
  const payload = req.payload;
  const { customer, properties } = payload;
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
          last_name: customer.last_name,
          country_code: "DK"
        },
        shipping_address: {
          first_name: customer.first_name,
          last_name: customer.last_name,
          country_code: "DK",
          address1: "---",
          city: customer.city,
          zip: customer.zip
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
  const body = await rp(options);
  const newOrder = new Order(body.order);
  newOrder.save();
  return body;
};
