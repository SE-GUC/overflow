import React from "react";
import { Route } from "react-router-dom";
import VacancyPage from './pages/VacancyPage'
export default () => {
  return [
  <Route exact path="/VacancyPage" component={VacancyPage} />
];
};
