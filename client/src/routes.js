import React from "react";
import { Route } from "react-router-dom";
import Vacancy from "./pages/Vacancy";
import SignUp from "./pages/SignUp";
import Vacancies from "./pages/Vacancies";
import CreateVacancy from "./pages/CreateVacancy";
import SubmitModal from './components/reviews/SubmitModal';
import * as axios from "./services/axios.js";

export default () => {
  
  return [
    <Route exact path="/Vacancy/:id" component={Vacancy} />,
    <Route exact path="/SignUp" component={SignUp} />,
    <Route path="/Vacancies" component={Vacancies}  />,
    <Route path="/SubmitModal" component={SubmitModal}  />,
    <Route exact path="/CreateVacancy/:partnerId" component={CreateVacancy} />
  ];
};
