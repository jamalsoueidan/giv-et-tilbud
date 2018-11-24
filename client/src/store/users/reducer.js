import * as actions from "./actions";

const initState = {};

const all = (state = initState, action) => {
  if (action.type === actions.LOAD_USERS_SUCCESS) {
    return action.payload;
  }
  return state;
};

const current = (state = initState, action) => {
  if (action.type === actions.LOAD_USER_SUCCESS) {
    return action.payload;
  }
  return state;
};

export default (state = initState, action) => ({
  all: all(state.all, action),
  current: current(state.current, action)
});
