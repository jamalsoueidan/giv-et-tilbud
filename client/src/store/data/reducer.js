import * as actions from "./actions";

const initState = {
  // dynamic, the whole application can use this to save data across all pages
};

export default (state = initState, action) => {
  if (action.type === actions.UPDATE_DATA) {
    return {
      ...state,
      ...action.payload
    };
  }
  return state;
};
