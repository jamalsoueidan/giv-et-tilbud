import * as actions from "./actions";

const initState = [];

export default (state = initState, action) => {
  if (action.type === actions.RECEIVE_SUCCESS) {
    return action.payload.orders;
  } else if (
    action.type === actions.SEND_OFFER_SUCCESS ||
    action.type === actions.CANCEL_OFFER_SUCCESS
  ) {
    const order = action.payload;
    const newState = state.filter(o => o.id !== order.id);
    return [...newState, order];
  }
  return state;
};
