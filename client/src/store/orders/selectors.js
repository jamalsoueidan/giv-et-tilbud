import { createSelector } from "reselect";

const keyValue = (properties, property) => {
  properties[property.name] = property.value;
  return properties;
};

const cleanUpOrder = order => {
  //https://stackoverflow.com/questions/18359093/how-to-copy-javascript-object-to-new-variable-not-by-reference?answertab=votes#tab-top
  const newOrder = JSON.parse(JSON.stringify(order));

  newOrder.properties = newOrder.line_items[0].properties.reduce(keyValue, {});

  if (newOrder.offer) {
    newOrder.offer.properties = newOrder.offer.properties.reduce(keyValue, {});
  }

  newOrder.customer = {
    first_name: order.customer.first_name,
    last_name: order.customer.last_name,
    address: order.shipping_address.address1,
    zip: order.shipping_address.zip,
    city: order.shipping_address.city
  };

  return newOrder;
};

const cleanUpAllOrders = orders => {
  if (orders.results) {
    return {
      ...orders,
      results: orders.results.map(cleanUpOrder)
    };
  }
  return orders;
};

const outgoing = state => state.orders.outgoing;
export const getOutgoing = createSelector(outgoing, cleanUpAllOrders);

const incoming = state => state.orders.incoming;
export const getIncoming = createSelector(incoming, cleanUpAllOrders);

const finished = state => state.orders.finished;
export const getFinished = createSelector(finished, cleanUpAllOrders);

const getOrder = state => state.orders.order;
const route = state => state.router.route;

const byRouteId = (orders, orderId) => {
  if (!orders.results) {
    return null;
  }
  return orders.results.find(order => order.id === orderId);
};

const find = (orders, order, orderId) => {
  const found = byRouteId(orders, route);
  if (found) return found;

  if (order && order.id === orderId) {
    return cleanUpOrder(order);
  }

  return null;
};

const orderId = state => Number(state.router.route.params.id);

export const getOutgoingOrderById = createSelector(
  getOutgoing,
  getOrder,
  orderId,
  find
);

export const getIncomingOrderById = createSelector(
  getIncoming,
  getOrder,
  orderId,
  find
);

export const getFinishedOrderById = createSelector(
  getFinished,
  getOrder,
  orderId,
  find
);
