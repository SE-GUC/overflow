import React from "react";
import { Route } from "react-router-dom";
import Vacancy from "./pages/Vacancy";
import SignUp from "./pages/SignUp";
import Vacancies from "./pages/Vacancies";
import CreateVacancy from "./pages/CreateVacancy";
export default () => {
  return [
    <Route exact path="/Vacancy/:id" component={Vacancy} />,
    <Route exact path="/SignUp" component={SignUp} />,
    <Route path="/Vacancies" component={Vacancies} />,
    <Route exact path="/CreateVacancy/:partnerId" component={CreateVacancy} />
  ];
};
