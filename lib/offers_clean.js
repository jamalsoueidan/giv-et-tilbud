module.exports = (orders, credentials) =>
  // count total offers
  // remove all other offers for security reason
  // add customer only offer in response
  orders.map(order => {
    order.offers_count = order.offers.length;
    order.offer = order.offers.find(
      offer => offer.customerId === credentials.customerId
    );
    // figure out how to unselect fields with lookup
    delete order.email;
    delete order.phone;
    delete order.shipping_address.address1;
    delete order.customer.last_name;
    delete order.offers;
    return order;
  });
