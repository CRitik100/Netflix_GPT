import React from "react";
import ReactDOM from "react-dom/client";
import Main from "./component/Main";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={appStore}>
    <Main />
  </Provider>,
);
