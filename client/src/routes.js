import React from "react";
import { Route } from "react-router-dom";
import Vacancy from './pages/Vacancy'
export default () => {
  return [
  <Route exact path="/Vacancy/:id" component={Vacancy} />
];
};
