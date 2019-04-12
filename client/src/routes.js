import React from "react";
import { Route } from "react-router-dom";
import Vacancy from "./pages/Vacancy";
import SignUp from "./pages/SignUp";
import Vacancies from "./pages/Vacancies";
import CreateVacancy from "./pages/CreateVacancy";
import SubmitModal from './components/reviews/SubmitModal';
import SubmitFeedbackModal from './components/feedbacks/SubmitFeedbackModal';
import EditProfileTest from './pages/EditProfileTest'
import EditProfile from './pages/EditProfile'
import Members from "./pages/Members";
import Partners from "./pages/Partners";
import LifeCoaches from "./pages/LifeCoaches";

export default () => {
  return [
    <Route path="/EditTest" component={EditProfileTest}  />,
    <Route path="/EditProfile" component={EditProfile}  />,
    <Route path="/SubmitModal" component={SubmitModal}  />,
    <Route path="/SubmitFeedbackModal" component={SubmitFeedbackModal}  />,
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
  ];
};
