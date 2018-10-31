import { createSelector } from "reselect";

const getOrders = state => state.orders;
const getUser = state => state.user;
const route = state => state.router.route;

export const getIncomingOrders = createSelector(
  getOrders,
  getUser,
  (orders, user) => {
    return orders.filter(
      order =>
        !order.offers.find(offer => offer.customerId === user.customerId) &&
        !order.fulfillment_status
    );
  }
);

export const getOutgoingOrders = createSelector(
  getOrders,
  getUser,
  (orders, user) => {
    return orders.filter(
      order =>
        order.offers.find(offer => offer.customerId === user.customerId) &&
        !order.fulfillment_status
    );
  }
);

export const getFinishedOrders = createSelector(
  getOrders,
  getUser,
  (orders, user) => {
    return orders.filter(
      order =>
        !order.offers.find(offer => offer.customerId === user.customerId) &&
        order.fulfillment_status
    );
  }
);

export const getOrder = createSelector(getOrders, route, (orders, route) => {
  const orderId = Number(route.params.id);
  return orders.find(order => order.id === orderId);
});

export const getOffer = createSelector(getOrder, getUser, (order, user) => {
  if (!order) return null;
  return order.offers.find(offer => offer.customerId === user.customerId);
});
