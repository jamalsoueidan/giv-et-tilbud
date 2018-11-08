import createRouter from "router5";
import browserPlugin from "router5/plugins/browser";
import routes from "./routes";
import store from "./store";
import localStorage from "local-storage";
import { actions as UserActions } from "../store/user";

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

// https://github.com/router5/router5/issues/184
const requireAuth = (router, dependencies) => (toState, fromState, done) => {
  const userState = store().getState().user;
  const toRoute = routesMap[toState.name];

  const redirect = {
    redirect: {
      name: "login",
      params: {
        nextName: toState.name,
        nextParams: toState.params
      }
    }
  };

  // on browser refresh, token exist in storage but user must authorize again to make sure he is logged in.
  const user = JSON.parse(localStorage("user"));
  if (user && !userState.token) {
    store()
      .dispatch(UserActions.isAuthenticated(user.token))
      .then(response => {
        if (!response.error) {
          done();
        } else {
          localStorage.remove("user");
          done(redirect);
        }
      });
  }
  // if he must login and the state token is empty, redirect to login page.
  else if (toRoute.auth === undefined && !userState.token) {
    return done(redirect);
  } else {
    return done();
  }
};

export default () => {
  if (router) return router;
  router = window.router = createRouter(routes, {
    defaultRoute: "login"
  })
    .usePlugin(browserPlugin())
    .useMiddleware(requireAuth);
  return router;
};
