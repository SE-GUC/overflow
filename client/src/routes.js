import React from "react";
import { Route } from "react-router-dom";
import Vacancy from "./pages/Vacancy";
import SignUp from "./pages/SignUp";
import Vacancies from "./pages/Vacancies";
import CreateVacancy from "./pages/CreateVacancy";
import LifeCoachProfile from "./pages/LifeCoachProfile";
export default () => {
  return [
    <Route exact path="/Vacancy/:id" component={Vacancy} />,
    <Route exact path="/SignUp" component={SignUp} />,
    <Route exact path="/Vacancies" component={Vacancies} />,
    <Route exact path="/CreateVacancy/:partnerId" component={CreateVacancy} />,
    <Route exact path="/LifeCoach/:id" component={LifeCoachProfile} />
  ];
};
