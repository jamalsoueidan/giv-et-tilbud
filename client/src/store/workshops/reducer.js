import * as actions from "./actions";

const initState = {};

const all = (state = initState, action) => {
  if (action.type === actions.LOAD_WORKSHOPS_SUCCESS) {
    return action.payload;
  }
  return state;
};

const current = (state = null, action) => {
  if (action.type === actions.LOAD_BY_ID_SUCCESS) {
    return action.payload;
  }
  return state;
};

export default (state = initState, action) => ({
  all: all(state.all, action),
  current: current(state.current, action)
});
