import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import Application from "./application";

export default element =>
  ReactDOM.render(
    <Provider store={store}>
      <Application />
    </Provider>,
    element
  );
