import { RSAA } from "redux-api-middleware";

export const RECEIVE_REQUEST = "orders/receive/request";
export const RECEIVE_SUCCESS = "orders/receive/success";
export const RECEIVE_FAILURE = "orders/receive/failure";

const receive = () => ({
  [RSAA]: {
    types: [RECEIVE_REQUEST, RECEIVE_SUCCESS, RECEIVE_FAILURE],
    endpoint: "/api/orders",
    method: "GET",
    headers: { "Content-Type": "application/json" }
  }
});

export { receive };
