import { RSAA } from "redux-api-middleware";

export const RECEIVE_REQUEST = "@@orders/RECEIVE_REQUEST";
export const RECEIVE_SUCCESS = "@@orders/RECEIVE_SUCCESS";
export const RECEIVE_FAILURE = "@@orders/RECEIVE_FAILURE";

export const SEND_OFFER_REQUEST = "@@orders/SEND_OFFER_REQUEST";
export const SEND_OFFER_SUCCESS = "@@orders/SEND_OFFER_SUCCESS";
export const SEND_OFFER_FAILURE = "@@orders/SEND_OFFER_FAILURE";

export const CANCEL_OFFER_REQUEST = "@@orders/CANCEL_OFFER_REQUEST";
export const CANCEL_OFFER_SUCCESS = "@@orders/CANCEL_OFFER_SUCCESS";
export const CANCEL_OFFER_FAILURE = "@@orders/CANCEL_OFFER_FAILURE";

const receive = () => ({
  [RSAA]: {
    types: [RECEIVE_REQUEST, RECEIVE_SUCCESS, RECEIVE_FAILURE],
    endpoint: "/api/orders",
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

export { receive, cancelOffer, sendOffer };
