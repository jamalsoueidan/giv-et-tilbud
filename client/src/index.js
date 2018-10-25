import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router5";
import Application from "./application";
import * as serviceWorker from "./serviceWorker";
import "./index.css";
import { store, router } from "./core";

const wrapper = (
  <Provider store={store()}>
    <RouterProvider router={router()}>
      <Application />
    </RouterProvider>
  </Provider>
);

router().start((err, state) => {
  ReactDOM.render(wrapper, document.getElementById("root"));
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
