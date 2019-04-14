import React, { Component } from "react";
import { get } from "../services/axios";
import "../styling/Vacancies.css";
import VacanciesList from "../components/vacancies/List.js";
import {
  Header,
  Dimmer,
  Loader,
  Icon,
  Input,
  Divider,
  Message,
  Transition
} from "semantic-ui-react";

class Vacancies extends Component {
  state = {
    vacancies: [],
    error: false,
    loading: true,
    searchBar: ""
  };
  changeSearchBar = e => {
    this.setState({ searchBar: e.target.value });
  };

  componentDidMount() {
    get("vacancies")
      .then(response => this.setState({ vacancies: response, loading: false }))
      .catch(error => this.setState({ error: true, loading: false }));
  }
  search = vacancies => {
    const { searchBar } = this.state;
    if (searchBar.length === 0) return vacancies;
    const keys = searchBar.split(" ");
    const filteredArray = [];
    const searchProps = ["title", "location", "description"];
    vacancies.forEach(vac => {
      keys.forEach(key => {
        if (vac.partner.name.toUpperCase().includes(key.toUpperCase())) {
          if (vac.matchCount) vac.matchCount++;
          else vac.matchCount = 1;
        }
        if (vac.skills) {
          const skills = vac.skills.forEach(skill => {
            if (skill.toUpperCase().includes(key.toUpperCase())) {
              if (vac.matchCount) vac.matchCount++;
              else vac.matchCount = 1;
            }
          });
        }
        searchProps.forEach(prop => {
          const value = vac[prop];
          if (value) {
            if (value.toUpperCase().includes(key.toUpperCase())) {
              if (vac.matchCount) vac.matchCount++;
              else vac.matchCount = 1;
            }
          }
        });
      });
      if (vac.matchCount) filteredArray.push(vac);
    });
    return filteredArray
      .sort((a, b) => b.matchCount - a.matchCount)
      .map(obj => {
        delete obj.matchCount;
        return obj;
      });
  };

  render() {
    const { vacancies, error, loading, searchBar } = this.state;
    const filteredVacancies = this.search(vacancies);
    return (
      <div className="vacancy-container">
        <Dimmer active={loading}>
          <Loader size="massive" />
        </Dimmer>
        <Header as="h1" textAlign="center">
          <Icon name="wpforms" className="vacancies-icon" />
          Vacancies
          <Header.Subheader>
            Perfectly curated for your needs
            <Divider hidden />
            <Input
              placeholder="Search using any field"
              size="mini"
              icon="search"
              onChange={this.changeSearchBar}
              value={searchBar}
            />
            <Divider hidden fitted />
            <Message
              compact
              style={{ maxWidth: "20em" }}
              error
              hidden={filteredVacancies.length > 0 || loading}
              icon
            >
              {" "}
              <Icon size="mini" name="search" />
              No results found for {searchBar}
            </Message>
          </Header.Subheader>
        </Header>
        <Transition.Group duration={400}>
          {filteredVacancies.map(vacancy => (
            <div key={vacancy._id}>
              <VacanciesList
                error={error}
                searchKey={searchBar}
                vacancy={vacancy}
              />
            </div>
          ))}
        </Transition.Group>
      </div>
    );
  }
}

export default Vacancies;
