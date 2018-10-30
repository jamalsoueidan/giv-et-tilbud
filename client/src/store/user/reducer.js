import * as actions from "./actions";

const initState = {
  token: null,
  email: null,
  payload: null
};

export default (state = initState, action) => {
  if (action.type === actions.LOGIN_FAILURE) {
    return {
      ...state,
      payload: action.payload
    };
  }
  if (action.type === actions.LOGIN_SUCCESS) {
    const { token, email } = action.payload;
    return {
      token,
      email,
      payload: null
    };
  }
  return state;
};