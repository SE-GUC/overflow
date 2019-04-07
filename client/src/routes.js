import React from "react";
import { Route } from "react-router-dom";
import Vacancies from "./pages/Vacancies";
import CreateVacancy from "./pages/CreateVacancy";

export default () => {
  return [
    <Route path="/Vacancies" component={Vacancies} />,
    <Route exact path="/CreateVacancy/:partnerId" component={CreateVacancy} />
  ];
};
