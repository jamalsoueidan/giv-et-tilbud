import { RSAA } from "redux-api-middleware";

export const LOAD_ORDERS_REQUEST = "@@orders/LOAD_ORDERS_REQUEST";
export const LOAD_ORDERS_SUCCESS = "@@orders/LOAD_ORDERS_SUCCESS";
export const LOAD_ORDERS_FAILURE = "@@orders/LOAD_ORDERS_FAILURE";

export const SEND_OFFER_REQUEST = "@@orders/SEND_OFFER_REQUEST";
export const SEND_OFFER_SUCCESS = "@@orders/SEND_OFFER_SUCCESS";
export const SEND_OFFER_FAILURE = "@@orders/SEND_OFFER_FAILURE";

export const CANCEL_OFFER_REQUEST = "@@orders/CANCEL_OFFER_REQUEST";
export const CANCEL_OFFER_SUCCESS = "@@orders/CANCEL_OFFER_SUCCESS";
export const CANCEL_OFFER_FAILURE = "@@orders/CANCEL_OFFER_FAILURE";

const loadOrders = (workshopId, page = 0, limit = 5) => ({
  [RSAA]: {
    types: [LOAD_ORDERS_REQUEST, LOAD_ORDERS_SUCCESS, LOAD_ORDERS_FAILURE],
    endpoint: `/api/orders?workshopid=${workshopId}&page=${page}&limit=${limit}`,
    method: "GET"
  }
});

const cancelOffer = orderId => ({
  [RSAA]: {
    types: [CANCEL_OFFER_REQUEST, CANCEL_OFFER_SUCCESS, CANCEL_OFFER_FAILURE],
    endpoint: `/api/orders/${orderId}/offers/cancel`,
    method: "POST"
  }
});

const sendOffer = (orderId, message, price) => ({
  [RSAA]: {
    types: [SEND_OFFER_REQUEST, SEND_OFFER_SUCCESS, SEND_OFFER_FAILURE],
    endpoint: `/api/orders/${orderId}/offers`,
    method: "POST",
    body: JSON.stringify({
      properties: [
        {
          name: "message",
          value: message
        },
        {
          name: "price",
          value: price.toString()
        }
      ]
    })
  }
});

export { loadOrders, cancelOffer, sendOffer };
