import * as actions from "./actions";

const initState = {};

const incoming = (state = initState, action) => {
  if (action.type === actions.LOAD_INCOMING_SUCCESS) {
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

const outgoing = (state = initState, action) => {
  if (action.type === actions.LOAD_OUTGOING_SUCCESS) {
    return action.payload;
  }
  return state;
};

const finished = (state = initState, action) => {
  if (action.type === actions.LOAD_FINISHED_SUCCESS) {
    return action.payload;
  }
  return state;
};

export default (state = initState, action) => ({
  incoming: incoming(state.incoming, action),
  outgoing: outgoing(state.outgoing, action),
  finished: finished(state.finished, action)
});
