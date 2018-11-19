const keyValue = (properties, property) => {
  properties[property.name] = property.value;
  return properties;
};

export const cleanOffer = offer => {
  if (offer) {
    offer.properties = offer.properties.reduce(keyValue, {});
  }
  return offer;
};

export const cleanOrder = order => {
  //https://stackoverflow.com/questions/18359093/how-to-copy-javascript-object-to-new-variable-not-by-reference?answertab=votes#tab-top
  const newOrder = JSON.parse(JSON.stringify(order));

  newOrder.properties = newOrder.line_items[0].properties.reduce(keyValue, {});
  newOrder.offer = cleanOffer(newOrder.offer);

  if (newOrder.offers) {
    newOrder.offers = newOrder.offers.map(cleanOffer);
  }

  newOrder.customer = {
    first_name: order.customer.first_name,
    last_name: order.customer.last_name,
    address: order.shipping_address.address1,
    zip: order.shipping_address.zip,
    city: order.shipping_address.city,
    phone: order.phone
  };

  return newOrder;
};
