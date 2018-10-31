import { actions as OrdersActions } from "../orders";
import * as actions from "./actions";

const defaultTimer = 5000;

const variants = {
  success: "success",
  warning: "warning",
  error: "error",
  info: "info"
};

const initState = {
  open: false,
  message: "",
  variant: "success",
  timer: defaultTimer
};

export default (state = initState, action) => {
  if (action.type === OrdersActions.SEND_OFFER_SUCCESS) {
    return {
      ...state,
      open: true,
      message: "Dit bud er blevet sendt!",
      variant: variants.success
    };
  }

  if (action.type === OrdersActions.CANCEL_OFFER_SUCCESS) {
    return {
      ...state,
      open: true,
      message: "Dit bud er annulleret!",
      variant: variants.info
    };
  }

  if (action.type === actions.HIDE_NOTIFICATION) {
    return {
      ...state,
      open: false
    };
  }
  return state;
};
