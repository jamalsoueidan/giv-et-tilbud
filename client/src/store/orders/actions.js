import { RSAA } from "redux-api-middleware";

export const LOAD_INCOMING_REQUEST = "@@orders/LOAD_ORDERS_REQUEST";
export const LOAD_INCOMING_SUCCESS = "@@orders/LOAD_ORDERS_SUCCESS";
export const LOAD_INCOMING_FAILURE = "@@orders/LOAD_ORDERS_FAILURE";

export const LOAD_OUTGOING_REQUEST = "@@orders/LOAD_OUTGOING_REQUEST";
export const LOAD_OUTGOING_SUCCESS = "@@orders/LOAD_OUTGOING_SUCCESS";
export const LOAD_OUTGOING_FAILURE = "@@orders/LOAD_OUTGOING_FAILURE";

export const LOAD_FINISHED_REQUEST = "@@orders/LOAD_FINISHED_REQUEST";
export const LOAD_FINISHED_SUCCESS = "@@orders/LOAD_FINISHED_SUCCESS";
export const LOAD_FINISHED_FAILURE = "@@orders/LOAD_FINISHED_FAILURE";

export const SEND_OFFER_REQUEST = "@@orders/SEND_OFFER_REQUEST";
export const SEND_OFFER_SUCCESS = "@@orders/SEND_OFFER_SUCCESS";
export const SEND_OFFER_FAILURE = "@@orders/SEND_OFFER_FAILURE";

export const CANCEL_OFFER_REQUEST = "@@orders/CANCEL_OFFER_REQUEST";
export const CANCEL_OFFER_SUCCESS = "@@orders/CANCEL_OFFER_SUCCESS";
export const CANCEL_OFFER_FAILURE = "@@orders/CANCEL_OFFER_FAILURE";

export const loadIncoming = (options = {}) => {
  const workshopId = options.workshopId;
  const page = options.page || 0;
  const limit = options.limit || 5;
  const device = options.device || "";
  const issue = options.issue || "";

  return {
    [RSAA]: {
      types: [
        LOAD_INCOMING_REQUEST,
        LOAD_INCOMING_SUCCESS,
        LOAD_INCOMING_FAILURE
      ],
      endpoint: `/api/orders/incoming?workshopid=${workshopId}&page=${page}&limit=${limit}&issue=${issue}&device=${device}`,
      method: "GET"
    }
  };
};

export const ACCEPTED_REQUEST = "@@orders/ACCEPTED_REQUEST";
export const ACCEPTED_SUCCESS = "@@orders/ACCEPTED_SUCCESS";
export const ACCEPTED_FAILURE = "@@orders/ACCEPTED_FAILURE";

export const loadAccepted = () => ({
  [RSAA]: {
    types: [ACCEPTED_REQUEST, ACCEPTED_SUCCESS, ACCEPTED_FAILURE],
    endpoint: `/api/orders/accepted`,
    method: "GET"
  }
});

export const loadOutgoing = (page, limit) => ({
  [RSAA]: {
    types: [
      LOAD_OUTGOING_REQUEST,
      LOAD_OUTGOING_SUCCESS,
      LOAD_OUTGOING_FAILURE
    ],
    endpoint: `/api/orders/outgoing?page=${page}&limit=${limit}`,
    method: "GET"
  }
});

export const loadFinished = (page, limit) => ({
  [RSAA]: {
    types: [
      LOAD_FINISHED_REQUEST,
      LOAD_FINISHED_SUCCESS,
      LOAD_FINISHED_FAILURE
    ],
    endpoint: `/api/orders/outgoing?fulfillment_status=fulfilled&page=${page}&limit=${limit}`,
    method: "GET"
  }
});

export const cancelOffer = orderId => ({
  [RSAA]: {
    types: [CANCEL_OFFER_REQUEST, CANCEL_OFFER_SUCCESS, CANCEL_OFFER_FAILURE],
    endpoint: `/api/orders/${orderId}/offers/cancel`,
    method: "POST"
  }
});

export const sendOffer = (options = {}) => ({
  [RSAA]: {
    types: [SEND_OFFER_REQUEST, SEND_OFFER_SUCCESS, SEND_OFFER_FAILURE],
    endpoint: `/api/orders/${options.orderId}/offers`,
    method: "POST",
    body: JSON.stringify({
      workshopId: options.workshopId,
      properties: [
        {
          name: "message",
          value: options.message
        },
        {
          name: "price",
          value: options.price.toString()
        }
      ]
    })
  }
});
