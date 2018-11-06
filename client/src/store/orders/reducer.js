import * as actions from "./actions";

const initState = {};

export default (state = initState, action) => {
  if (action.type === actions.LOAD_ORDERS_SUCCESS) {
    return action.payload;
  } else if (
    action.type === actions.SEND_OFFER_SUCCESS ||
    action.type === actions.CANCEL_OFFER_SUCCESS
  ) {
    const order = action.payload;
    const newState = state.results.filter(o => o.id !== order.id);
    return { ...state, results: [...newState, order] };
  }
  return state;
};
