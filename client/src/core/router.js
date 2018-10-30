import createRouter from "router5";
import browserPlugin from "router5/plugins/browser";
import routes from "./routes";
import store from "./store";

let router;

// https://life.wongnai.com/router5-39d97bd9e48d chinese
const routesToMap = routes => {
  let out = {};

  const walk = (child, prefix) => {
    for (let item of child) {
      out[`${prefix}${item.name}`] = item;

      if (item.children) {
        walk(item.children, `${prefix}${item.name}.`);
      }
    }
  };

  walk(routes, "");

  return out;
};

const routesMap = routesToMap(routes);

const onEnterMiddleware = routes => (router, dependencies) => (
  toState,
  fromState,
  done
) => {
  const userState = store().getState().user;
  const toRoute = routesMap[toState.name];

  if (toRoute.auth === undefined && !userState.token) {
    done({
      redirect: {
        name: "login",
        params: {
          nextName: toState.name,
          nextParams: toState.params
        }
      }
    });
  } else {
    done();
  }
};

export default () => {
  if (router) return router;
  router = window.router = createRouter(routes, { defaultRoute: "login" })
    .usePlugin(browserPlugin())
    .useMiddleware(onEnterMiddleware(routes));
  return router;
};
