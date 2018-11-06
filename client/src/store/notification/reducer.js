import { actions as OrdersActions } from "../orders";
import { actions as UserActions } from "../user";
import { actions as DataActions } from "../data";
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

const success = msg => ({
  ...initState,
  open: true,
  message: msg,
  variant: variants.success
});

const info = msg => ({
  ...initState,
  open: true,
  message: msg,
  variant: variants.info
});

export default (state = initState, action) => {
  if (action.type === OrdersActions.SEND_OFFER_SUCCESS) {
    return success("Dit bud er blevet sendt!");
  }

  if (action.type === OrdersActions.CANCEL_OFFER_SUCCESS) {
    return info("Dit bud er annulleret!");
  }

  if (action.type === UserActions.WORKSHOP_CREATE_SUCCESS) {
    return success("Værkstedet er blevet oprettet!");
  }

  if (action.type === DataActions.UPDATE_DATA) {
    if (action.payload.selectedWorkshopId) {
      return info("Værksted er blevet skiftet!");
    }
  }

  if (action.type === actions.HIDE_NOTIFICATION) {
    return {
      ...state,
      open: false
    };
  }
  return state;
};
