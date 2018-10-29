import Pages from "../pages";
import Layouts from "../layouts";
import { routes } from "../core";

const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const findRoute = (routeName, currentRoutes) => {
  const rts = currentRoutes ? currentRoutes : routes;
  const search = Array.isArray(rts) ? rts : rts.children;
  return search.find(r => r.name === routeName);
};

const getPage = route => {
  const name = capitalizeFirstLetter(route.name);
  return Pages[name];
};

const getLayout = layout => {
  if (!layout) return Layouts["Default"];
  return Layouts[capitalizeFirstLetter(layout)];
};

const getRoute = routeName =>
  routeName
    .split(".")
    .reduce((routes, name) => findRoute(name, routes), routes);

export default { getRoute, getPage, getLayout };
