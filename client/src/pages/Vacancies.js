import React, { Component } from "react";
import { get, put, del } from "../services/axios";
import "../styling/Vacancies.css";
import decode from "jwt-decode";
import storageChanged from "storage-changed";
import VacanciesList from "../components/vacancies/List.js";
import {
  Header,
  Dimmer,
  Loader,
  Icon,
  Input,
  Divider,
  Confirm,
  Message
} from "semantic-ui-react";

class Vacancies extends Component {
  state = {
    vacancies: [],
    error: false,
    loading: true,
    searchBar: "",
    adminType: false,
    openConfirm: false,
    deletedId: "",
    filteredVacancies: [],
    pendingCount: 0,
    partnerId: "",
    approveLoading: false
  };
  changeSearchBar = e => {
    this.setState({ searchBar: e.target.value });
  };

  setToken = () => {
    const tokenCheck = localStorage.getItem("jwtToken");
    if (!tokenCheck) {
      this.setState({ adminType: false });
      return;
    }
    const decoded = decode(localStorage.getItem("jwtToken"));
    if (decoded.type === "admin") {
      this.setState({ adminType: true });
    }
  };
  componentWillUnmount() {
    window.removeEventListener("storage", this.setToken);
  }
  componentDidMount() {
    this.setToken();
    storageChanged("local", {
      eventName: "tokenChange"
    });
    window.addEventListener("tokenChange", this.setToken);
    get("vacancies")
      .then(response => {
        this.setState({ vacancies: response, loading: false });
        this.setData(response, this.state.adminType);
      })
      .catch(error => this.setState({ error: true, loading: false }));
  }
  setApproved = (id, pid) => {
    const { adminType, filteredVacancies } = this.state;

    let newFilteredVacancies = filteredVacancies.map(vacancy => {
      if (vacancy._id === id) {
        return { ...vacancy, state: "free" };
      } else {
        return vacancy;
      }
    });
    console.log(newFilteredVacancies, "After Filter");
    let approvedVacancy = newFilteredVacancies.find(vacancy => vacancy._id === id);

    approvedVacancy = { ...approvedVacancy, state: "free" };
    const url = "vacancies/update/" + id;

    const data = {
      ...approvedVacancy,
      partnerId: pid
    };
    const { _id, partner, __v, ...newData } = data;
    put(url, newData).then(
      this.setData(newFilteredVacancies, true),
      this.setState({ approveLoading: false })
    );
  };
  delete = deletedId => {
    // const { deletedId } = this.state;
    let { vacancies } = this.state;
    const vacancyIndex = vacancies.findIndex(
      vacancy => vacancy._id === deletedId
    );
    vacancies.splice(vacancyIndex, 1);
    this.setState({ vacancies });
    this.setData(vacancies, true);
    const url = "vacancies/delete/" + deletedId;
    del(url, {}).then(this.setState({ openConfirm: false }));
  };

  setData = (vacancies, adminType) => {
    if (vacancies.length === 0) return;
    let pendingCount = 0;
    const filteredVacancies = [];
    vacancies.forEach(vacancy => {
      if (vacancy.state === "free" || vacancy.state === "taken" || adminType) {
        if (vacancy.state === "unapproved" || vacancy.state === "Not taken")
          pendingCount++;
        filteredVacancies.push(vacancy);
      }
    });
    this.setState({ filteredVacancies, pendingCount });
  };
  redirect = id => {
    this.props.history.push("/Vacancy/" + id);
  };
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
    const {
      filteredVacancies,
      error,
      loading,
      searchBar,
      adminType,
      openConfirm,
      approveLoading,
      pendingCount
    } = this.state;
    console.log(filteredVacancies, "Filtered");
    const searchedVacancies = this.search(filteredVacancies);
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
              hidden={searchedVacancies.length > 0 || loading}
              icon
            >
              {" "}
              <Icon size="mini" name="search" />
              No results found for {searchBar}
            </Message>
          </Header.Subheader>
        </Header>

        <VacanciesList
          error={error}
          searchKey={searchBar}
          vacancies={searchedVacancies}
          approve={this.setApproved}
          adminType={adminType}
          del={this.delete}
          pendingCount={pendingCount}
          approveLoading={approveLoading}
          redirect={this.redirect}
        />
      </div>
    );
  }
}

export default Vacancies;
