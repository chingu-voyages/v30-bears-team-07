import "./index.scss";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router, Route, Redirect, Switch } from "react-router-dom";
import store from "./configureStore";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App data-test="component-app" />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

/*
note:  this stuff is just for performance measurement, putting it aside until it is needed
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
import reportWebVitals from "./reportWebVitals";
reportWebVitals();
*/
