import { createSelector } from "reselect";

const ordersOutgoing = state => state.orders.outgoing;
const route = state => state.router.route;

export const getOutgoingByRouteId = createSelector(
  ordersOutgoing,
  route,
  (orders, route) => {
    const orderId = Number(route.params.id);
    if (!orders.results) {
      return null;
    }
    return orders.results.find(order => order.id === orderId);
  }
);
