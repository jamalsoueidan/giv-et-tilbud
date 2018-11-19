import * as actions from "./actions";

const initState = {};

const incoming = (state = initState, action) => {
  if (action.type === actions.LOAD_INCOMING_SUCCESS) {
    return action.payload;
  } else if (action.type === actions.SEND_OFFER_SUCCESS) {
    return initState;
  } else if (action.type === actions.CANCEL_OFFER_SUCCESS) {
    return initState;
  }
  return state;
};

const outgoing = (state = initState, action) => {
  if (action.type === actions.LOAD_OUTGOING_SUCCESS) {
    return action.payload;
  } else if (action.type === actions.CANCEL_OFFER_SUCCESS) {
    return initState;
  } else if (action.type === actions.SEND_OFFER_SUCCESS) {
    return initState;
  }

  return state;
};

const finished = (state = initState, action) => {
  if (action.type === actions.LOAD_FINISHED_SUCCESS) {
    return action.payload;
  }
  return state;
};

const accepted = (state = initState, action) => {
  if (action.type === actions.ACCEPTED_SUCCESS) {
    return action.payload;
  }
  return state;
};

const order = (state = null, action) => {
  if (
    action.type === actions.ORDER_SUCCESS ||
    action.type === actions.LOAD_ORDER_SUCCESS
  ) {
    return action.payload;
  } else if (
    action.type === actions.SEND_OFFER_SUCCESS ||
    action.type === actions.CANCEL_OFFER_SUCCESS
  ) {
    return null;
  }
  return state;
};

const orders = (state = initState, action) => {
  if (action.type === actions.LOAD_ORDERS_SUCCESS) {
    return action.payload;
  }

  return state;
};

export default (state = initState, action) => ({
  incoming: incoming(state.incoming, action),
  outgoing: outgoing(state.outgoing, action),
  finished: finished(state.finished, action),
  accepted: accepted(state.accepted, action),
  orders: orders(state.orders, action), //admin orders
  order: order(state.order, action) //current order
});
