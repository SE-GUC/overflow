import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Responsive } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
class App extends Component {
  render() {
    return <h1> Overflow Test </h1>;
  }
}

export default withRouter(App);
