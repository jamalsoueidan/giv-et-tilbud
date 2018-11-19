import * as actions from "./actions";

const initState = {};

export default (state = initState, action) => {
  if (action.type === actions.LOAD_USERS_SUCCESS) {
    return action.payload;
  }
  return state;
};
