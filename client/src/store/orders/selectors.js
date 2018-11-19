import { createSelector } from "reselect";
import { cleanOrder, cleanOffer } from "lib/clean_response";

const cleanUpAllOrders = orders => {
  if (orders.results) {
    return {
      ...orders,
      results: orders.results.map(cleanOrder)
    };
  }
  return orders;
};

const outgoing = state => state.orders.outgoing;
export const getOutgoing = createSelector(
  outgoing,
  cleanUpAllOrders
);

const incoming = state => state.orders.incoming;
export const getIncoming = createSelector(
  incoming,
  cleanUpAllOrders
);

const finished = state => state.orders.finished;
export const getFinished = createSelector(
  finished,
  cleanUpAllOrders
);

const orders = state => state.orders.orders;
export const getOrders = createSelector(
  orders,
  cleanUpAllOrders
);

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
    return cleanOrder(order);
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

export const getOrderById = createSelector(
  getOrders,
  getOrder,
  orderId,
  find
);
