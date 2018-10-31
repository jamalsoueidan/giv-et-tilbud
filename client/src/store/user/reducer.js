import * as actions from "./actions";

const initState = {
  token: null,
  email: null,
  customerId: null,
  payload: null
};

export default (state = initState, action) => {
  if (action.type === actions.LOGIN_FAILURE) {
    return {
      ...state,
      payload: action.payload
    };
  }
  if (
    action.type === actions.LOGIN_SUCCESS ||
    action.type === actions.IS_AUTHENTICATED_SUCCESS
  ) {
    const { token, email, customerId } = action.payload;
    return {
      token,
      email,
      customerId,
      payload: null
    };
  }

  if (action.type === actions.LOGOUT_SUCCESS) {
    return initState;
  }

  return state;
};
