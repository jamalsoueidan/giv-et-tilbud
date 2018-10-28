import { combineReducers } from "redux";
import { router5Reducer } from "redux-router5";
import * as Orders from "../store/orders";

export default combineReducers({
  router: router5Reducer,
  [Orders["name"]]: Orders["reducer"]
});
