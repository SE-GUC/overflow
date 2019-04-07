import React, { Component } from "react";
import { get } from "../services/axios";
import "../styling/Vacancies.css";
import VacanciesList from "../components/Vacancies/List.js";
import { Header, Dimmer, Loader, Icon } from "semantic-ui-react";

class Vacancies extends Component {
  state = {
    vacancies: [],
    error: false,
    loading: true
  };

  componentDidMount() {
    get("vacancies")
      .then(response =>
        this.setState({ vacancies: response.data, loading: false })
      )
      .catch(error => this.setState({ error: true, loading: false }));
  }

  render() {
    const { vacancies, error, loading } = this.state;
    return (
      <div>
        <Dimmer active={loading}>
          <Loader size="massive" />
        </Dimmer>
        <Header as="h1" textAlign="center">
          <Icon name="wpforms" className="vacancies-icon" />
          Vacancies
          <Header.Subheader>Perfectly curated for your needs</Header.Subheader>
        </Header>
        <VacanciesList error={error} vacancies={vacancies} />
      </div>
    );
  }
}

export default Vacancies;
