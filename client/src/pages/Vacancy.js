import React, { Component } from "react";
import * as axios from "../services/axios.js";
import ApplyModal from "../components/vacancies/ApplyModal";
import decode from "jwt-decode";
import storageChanged from "storage-changed";

import {
  Button,
  Grid,
  Header,
  Card,
  Divider,
  Loader,
  Container,
  Dimmer,
  Image,
  Icon,
  Responsive
} from "semantic-ui-react";
import "../styling/vacancy.css";

class Vacancy extends Component {
  constructor() {
    super();
    this.state = {
      vacancy: null,
      modalHidden: true,
      memberType: false,
      memberId: "",
      applied: false
    };
  }

  getVacancy = async () => {
    const id = this.props.match.params.id;
    const url = "vacancies/" + id;
    await axios.get(url).then(vacancy => {
      this.setState({ vacancy: vacancy });
    });
  };
  componentDidMount() {
    const tokenCheck = localStorage.getItem("jwtToken");
    //handling token change
    storageChanged("local", {
      eventName: "tokenChange"
    });
    window.addEventListener("tokenChange", this.handleTokenChange);
    if (!tokenCheck) {
      this.setState({ memberType: false });
      this.getVacancy();
      return;
    }
    let decoded = decode(localStorage.getItem("jwtToken"));
    if (decoded.type) {
      if (decoded.type === "member") {
        this.setState({ memberType: true, memberId: decoded.id });
      }
    } else {
      this.setState({ memberType: false });
    }
    this.getVacancy();
  }
  handleTokenChange = e => {
    if (!e.detail.value) {
      this.setState({ memberType: false });
      return;
    }
    let decoded = decode(e.detail.value);
    if (decoded.type) {
      if (decoded.type === "member") {
        this.setState({ memberType: true, memberId: decoded.id });
      }
    } else {
      this.setState({ memberType: false });
    }
  };
  componentWillUnmount() {
    window.removeEventListener("storage", this.handleTokenChange);
  }
  handleApply = () => {
    this.setState({ modalHidden: false });
  };
  setApplied = () => {
    console.log("In applied");
    this.setState({ applied: true, modalHidden: false });
  };
  toggleHidden = () => {
    this.setState({ modalHidden: !this.state.modalHidden });
  };
  render() {
    const { vacancy, applied, memberType } = this.state;
    let toBeReturned = "";

    if (!vacancy) {
      toBeReturned = (
        <div>
          <Dimmer active>
            <Loader size="huge" inverted />
          </Dimmer>
        </div>
      );
    } else {
      let {
        skills,
        _id,
        availability,
        description,
        duration,
        endDate,
        dailyHours,
        state,
        startDate,
        location,
        monthlyWage,
        title,
        partner
      } = vacancy;
      let skillCards = [];
      if (skills) {
        if (skills.length > 0) {
          skills.map(skill => {
            skillCards.push(
              <Card className="skill-card" fluid>
                <Card.Content textAlign="center">
                  <Card.Header id="skill-header">{skill}</Card.Header>
                </Card.Content>
              </Card>
            );
          });
        }
      }
      toBeReturned = [
        <Grid celled container stackable centered raised id="vacancyGrid">
          <Grid.Row>
            <Grid.Column textAlign="center">
              <Header as="h1">{title}</Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered columns={2}>
            <Grid.Column width={10} textAlign="left">
              <Container>
                <Header as="h3">Description</Header>
                <p>{description}</p>
              </Container>
            </Grid.Column>
            <Grid.Column width={6} textAlign="center">
              <Grid.Row>
                <Header as="h3">Employer Details</Header>
                <Card fluid textAlign="center">
                  <Image
                    size="small"
                    centered="true"
                    src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                  />
                  <Card.Content>
                    <Card.Header>{partner.name}</Card.Header>
                    <Card.Description>{partner.fieldOfWork}</Card.Description>
                  </Card.Content>
                </Card>
              </Grid.Row>
              <Divider />
              <Grid.Row textAlign="center">
                {!applied ? (
                  <Button
                    disabled={!memberType}
                    onClick={this.handleApply}
                    stretch
                    color="green"
                  >
                    Apply On This Job
                  </Button>
                ) : (
                  <Button disabled={true} icon stretch>
                    <Icon name="check circle" color="green" />
                    Application in Process
                  </Button>
                )}
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={5}>
            <Grid.Column width={8} textAlign="center">
              <Header as="h3">Skills</Header>
              <Card.Group itemsPerRow={2}>{skillCards}</Card.Group>
            </Grid.Column>
            <Grid.Column width={2}>
              <Container>
                <Header as="h3">Availability</Header>
                <p>{availability}</p>
              </Container>
              <Divider />
              <Container>
                <Header as="h3">Location</Header>
                <p>{location}</p>
              </Container>
            </Grid.Column>
            <Grid.Column width={2}>
              <Container>
                <Header as="h3">Start Date</Header>
                <p>{startDate}</p>
              </Container>
              <Divider />
              <Container>
                <Header as="h3">End Date</Header>
                <p>{endDate}</p>
              </Container>
            </Grid.Column>
            <Grid.Column width={2}>
              <Container>
                <Header as="h3">Duration</Header>
                <p>{duration}</p>
              </Container>
              <Divider />
              <Container>
                <Header as="h3">Monthly Wage</Header>
                <p>{monthlyWage}</p>
              </Container>
            </Grid.Column>
            <Grid.Column width={2}>
              <Container>
                <Header as="h3">Daily Hours</Header>
                <p>{dailyHours}</p>
              </Container>
              <Divider />
              <Container>
                <Header as="h3">State</Header>
                <p>{state}</p>
              </Container>
            </Grid.Column>
          </Grid.Row>
        </Grid>,

        <ApplyModal
          vacancy={this.state.vacancy}
          memberId={this.state.memberId}
          hidden={this.state.modalHidden}
          handleHidden={() => this.toggleHidden}
          applied={() => this.setApplied()}
        />
      ];
    }
    return toBeReturned;
  }
}
export default Vacancy;
