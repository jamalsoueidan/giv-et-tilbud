import * as actions from "./actions";

const initState = [];

export default (state = initState, action) => {
  if (action.type === actions.RECEIVE_SUCCESS) {
    return action.payload.orders;
  }
  return state;
};
