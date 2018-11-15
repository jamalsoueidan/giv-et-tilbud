import { createSelector } from "reselect";

const route = state => state.router.route;

const cleanUp = orders => {
  if (orders.results) {
    const keyValue = (properties, property) => {
      properties[property.name] = property.value;
      return properties;
    };

    orders.results.map(order => {
      order.properties = order.line_items[0].properties.reduce(keyValue, {});

      if (order.offer) {
        order.offer.properties = order.offer.properties.reduce(keyValue, {});
      }

      order.customer = {
        first_name: order.customer.first_name,
        last_name: order.customer.last_name,
        address: order.shipping_address.address1,
        zip: order.shipping_address.zip,
        city: order.shipping_address.city
      };

      return order;
    });
    return orders;
  }
  return orders;
};

export const getOutgoing = createSelector(
  state => state.orders.outgoing,
  cleanUp
);

export const getIncoming = createSelector(
  state => state.orders.incoming,
  cleanUp
);

export const getFinished = createSelector(
  state => state.orders.finished,
  cleanUp
);

const byRouteId = (orders, route) => {
  const orderId = Number(route.params.id);
  if (!orders.results) {
    return null;
  }
  return orders.results.find(order => order.id === orderId);
};

export const getOutgoingByRouteId = createSelector(
  getOutgoing,
  route,
  byRouteId
);

export const getFinishedByRouteId = createSelector(
  getFinished,
  route,
  byRouteId
);
