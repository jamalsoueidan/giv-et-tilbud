import { createStore, applyMiddleware } from "redux";
import { apiMiddleware } from "redux-api-middleware";
import { router5Middleware } from "redux-router5";

import router from "./router";
import reducers from "./reducers";

let store;

export default () => {
  if (store) return store;

  const createStoreWithMiddleware = applyMiddleware(
    router5Middleware(router()),
    apiMiddleware
  )(createStore);

  return (store = createStoreWithMiddleware(
    reducers,
    {},
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ));
};
