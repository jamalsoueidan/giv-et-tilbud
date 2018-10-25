import createRouter from "router5";
import browserPlugin from "router5/plugins/browser";
import routes from "./routes";

let router;

export default () => {
  if (router) return router;
  router = createRouter(routes, { defaultRoute: "home" });
  router.usePlugin(browserPlugin());
  return router;
};
