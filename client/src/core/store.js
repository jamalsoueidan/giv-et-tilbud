import { createStore, applyMiddleware } from "redux";
import { apiMiddleware } from "redux-api-middleware";
import { router5Middleware } from "redux-router5";
import { RSAA } from "redux-api-middleware";
import localStorage from "local-storage";
import router from "./router";
import reducers from "./reducers";

let store;

const apiAuthInjector = () => next => action => {
  const callApi = action[RSAA];

  if (callApi) {
    if (!callApi.headers) {
      callApi.headers = {};
    }

    const headers = callApi.headers;
    if (!headers["Content-Type"])
      callApi.headers["Content-Type"] = "application/json";

    const isLoggedIn = JSON.parse(localStorage("user"));
    if (!headers["Authorization"] && isLoggedIn)
      callApi.headers["Authorization"] = `Bearer ${isLoggedIn.token}`;
  }

  return next(action);
};

export default () => {
  if (store) return store;

  const createStoreWithMiddleware = applyMiddleware(
    router5Middleware(router()),
    apiAuthInjector,
    apiMiddleware
  )(createStore);

  return (store = createStoreWithMiddleware(
    reducers,
    {},
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ));
};
