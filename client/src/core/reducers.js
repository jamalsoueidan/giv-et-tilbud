import { combineReducers } from "redux";
import { router5Reducer } from "redux-router5";
import * as Orders from "../store/orders";
import * as User from "../store/user";

export default combineReducers({
  router: router5Reducer,
  [Orders["name"]]: Orders["reducer"],
  [User["name"]]: User["reducer"]
});
