import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import Routes from "./routes";
import Scrolling from "./ScrollToTop.js";

ReactDOM.render(
  <BrowserRouter>
    {/* <Scrolling> */}
      <App>
        <Routes />
      </App>
    {/* </Scrolling> */}
  </BrowserRouter>,
  document.getElementById("root")
);
serviceWorker.unregister();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
