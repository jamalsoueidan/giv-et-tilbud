import createHistory from "history/createBrowserHistory";
import queryString from "query-string";

let history = createHistory();

history.jsonToParams = json =>
  "?" +
  Object.entries(json)
    .map(e => e.join("="))
    .join("&");

history.getParams = () => queryString.parse(window.location.search);

export default history;
