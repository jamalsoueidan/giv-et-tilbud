import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import Application from "./application";
import "react-confirm-alert/src/react-confirm-alert.css";

export default element =>
  ReactDOM.render(
    <Provider store={store}>
      <Application />
    </Provider>,
    element
  );
