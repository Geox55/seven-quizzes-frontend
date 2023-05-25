import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/reset.css";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./store/store";
import "./index.css";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want to Start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals\
