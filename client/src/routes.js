import React from "react";
import { Route } from "react-router-dom";
<<<<<<< HEAD
import Vacancy from './pages/Vacancy'
import SignUp from './pages/SignUp'
export default () => {
  return [
  <Route exact path="/Vacancy/:id" component={Vacancy} />,
  <Route exact path="/SignUp" component={SignUp} />
];
=======
import Vacancies from "./pages/Vacancies";
import CreateVacancy from "./pages/CreateVacancy";

export default () => {
  return [
    <Route path="/Vacancies" component={Vacancies} />,
    <Route exact path="/CreateVacancy/:partnerId" component={CreateVacancy} />
  ];
>>>>>>> react_dev
};
