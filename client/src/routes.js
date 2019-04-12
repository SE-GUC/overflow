import React from "react";
import { Route } from "react-router-dom";
import Vacancy from "./pages/Vacancy";
import SignUp from "./pages/SignUp";
import Vacancies from "./pages/Vacancies";
import CreateVacancy from "./pages/CreateVacancy";
import Members from "./pages/Members";
import Partners from "./pages/Partners";
import LifeCoaches from "./pages/LifeCoaches";
import SubmitModal from "./components/reviews/SubmitModal";
import * as axios from "./services/axios.js";

export default () => {
  return [
    <Route key={"/Vacancy"} exact path="/Vacancy/:id" component={Vacancy} />,
    <Route key={"/SignUp"} exact path="/SignUp" component={SignUp} />,
    <Route key={"/Vacancies"} path="/Vacancies" component={Vacancies} />,
    <Route
      key={"/CreateVacancy"}
      exact
      path="/CreateVacancy/:partnerId"
      component={CreateVacancy}
    />,
    <Route key={"/Members"} exact path="/Members" component={Members} />,
    <Route key={"/Partners"} exact path="/Partners" component={Partners} />,
    <Route
      key={"/lifeCoaches"}
      exact
      path="/LifeCoaches"
      component={LifeCoaches}
    />,
    <Route key={"/SubmitModal"} path="/SubmitModal" component={SubmitModal} />
  ];
};
