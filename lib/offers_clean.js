module.exports = (orders, credentials) =>
  // count total offers
  // remove all other offers for security reason
  // add customer only offer in response
  orders.map(order => {
    order.offers_count = order.offers.length;
    order.offer = order.offers.find(
      offer => offer.customer_id === credentials.customerId
    );
    // figure out how to unselect fields with lookup
    order.email = undefined;
    order.phone = undefined;
    order.shipping_address.address1 = undefined;
    order.customer.last_name = undefined;
    order.offers = undefined;
    return order;
  });
