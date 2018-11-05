import * as actions from "./actions";

const initState = {
  token: null,
  email: null,
  customerId: null,
  workshops: [],
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
    action.type === actions.IS_AUTHENTICATED_SUCCESS ||
    action.type === actions.WORKSHOP_CREATE_SUCCESS
  ) {
    return {
      ...action.payload,
      payload: null
    };
  }

  if (action.type === actions.LOGOUT_SUCCESS) {
    return initState;
  }

  return state;
};
