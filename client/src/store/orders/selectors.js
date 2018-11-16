import { createSelector } from "reselect";

const keyValue = (properties, property) => {
  properties[property.name] = property.value;
  return properties;
};

const cleanUpOrder = order => {
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
};

const cleanUpAllOrders = orders => {
  if (orders.results) {
    orders.results = orders.results.map(cleanUpOrder);
  }
  return orders;
};

export const getOutgoing = createSelector(
  state => state.orders.outgoing,
  cleanUpAllOrders
);

export const getIncoming = createSelector(
  state => state.orders.incoming,
  cleanUpAllOrders
);

export const getFinished = createSelector(
  state => state.orders.finished,
  cleanUpAllOrders
);

const getOrder = state => state.orders.order;
const route = state => state.router.route;

const byRouteId = (orders, route) => {
  const orderId = Number(route.params.id);
  if (!orders.results) {
    return null;
  }
  return orders.results.find(order => order.id === orderId);
};

const find = (orders, order, route) => {
  const found = byRouteId(orders, route);
  if (found) return found;

  if (order && order.id === Number(route.params.id)) {
    return cleanUpOrder(order);
  }

  return null;
};

export const getOutgoingOrderById = createSelector(
  getOutgoing,
  getOrder,
  route,
  find
);

export const getIncomingOrderById = createSelector(
  getIncoming,
  getOrder,
  route,
  find
);

export const getFinishedOrderById = createSelector(
  getFinished,
  getOrder,
  route,
  find
);
