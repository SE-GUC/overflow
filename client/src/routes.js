import React from "react";
import { Route } from "react-router-dom";
import Vacancies from "./pages/Vacancies";

export default () => {
  return [<Route path="/Vacancies" component={Vacancies} />];
};
