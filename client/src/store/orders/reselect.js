import { createSelector } from "reselect";

const getOrders = state => state.orders;

/*export const getIncomingOrders = createSelector(getOrders, orders => {
  orders.filter()
});*/
