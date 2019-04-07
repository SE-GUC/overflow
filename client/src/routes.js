import React from "react";
import { Route } from "react-router-dom";
import Vacancy from './pages/Vacancy'
import SignUp from './pages/SignUp'
export default () => {
  return [
  <Route exact path="/Vacancy/:id" component={Vacancy} />,
  <Route exact path="/SignUp" component={SignUp} />
];
};
