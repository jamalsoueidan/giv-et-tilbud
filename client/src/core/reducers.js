import { combineReducers } from "redux";
import { router5Reducer } from "redux-router5";
import * as Data from "../store/data";
import * as Orders from "../store/orders";
import * as User from "../store/user";
import * as Notification from "../store/notification";
import * as Users from "../store/users";
import * as Workshops from "../store/workshops";

export default combineReducers({
  router: router5Reducer,
  [Orders["name"]]: Orders["reducer"],
  [User["name"]]: User["reducer"],
  [Notification["name"]]: Notification["reducer"],
  [Data["name"]]: Data["reducer"],
  [Users["name"]]: Users["reducer"],
  [Workshops["name"]]: Workshops["reducer"]
});
