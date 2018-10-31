import { createSelector } from "reselect";

const getOrders = state => state.orders;
const getUser = state => state.user;

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
