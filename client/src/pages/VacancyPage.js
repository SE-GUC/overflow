import React, { Component } from "react";
import * as axios from "../services/axios.js";
import { Button,Grid } from "semantic-ui-react";
class VacancyPage extends Component {
  constructor() {
    super();
    this.state = {
      vacancy: null
    };
  }
  getVacancy = async () => {
    const id = this.props.vacancyId;
    const url = "vacancies/" + "5ca7b0348a73485200cf4f19";
    await axios.get(url).then(vacancy => {
      this.setState({ vacancy: vacancy });
    });
  };
  componentDidMount() {
    this.getVacancy();
  }
  render() {
    const { vacancy } = this.state;
    let toBeReturned = "";
    if (!vacancy) {
      toBeReturned = <div>Loading Vacancy</div>;
    } else {
      let {
        skills,
        _id,
        availability,
        description,
        duration,
        endDate,
        location,
        monthlyWage,
        partner
      } = vacancy;

      toBeReturned = (
        <div>
         <Grid>
           <Grid.Row>
           {skills}
           </Grid.Row>
           </Grid>
        </div>
      );
    }
    return toBeReturned;
  }
}
export default VacancyPage;
