import React from "react";
import { Route } from "react-router-dom";
import CreateVacancy from "./pages/CreateVacancy.js";

export default () => {
  return [
    <Route exact path="/CreateVacancy/:partnerId" component={CreateVacancy} />
  ];
};
