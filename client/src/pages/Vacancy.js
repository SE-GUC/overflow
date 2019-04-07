import React, { Component } from "react";
import * as axios from "../services/axios.js";
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
      vacancy: null
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
    this.getVacancy();
  }
  render() {
    const { vacancy } = this.state;
    let toBeReturned = "";

    if (!vacancy) {
      toBeReturned = (
        <div>
          <Dimmer active>
            <Loader inverted />
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
              <Card fluid>
                <Card.Content textAlign="center">
                  <Card.Header>{skill}</Card.Header>
                </Card.Content>
              </Card>
            );
          });
        }
      }
      toBeReturned = (
      
         
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
                        <Card.Description>
                          {partner.fieldOfWork}
                        </Card.Description>
                      </Card.Content>
                    </Card>
                  </Grid.Row>
                  <Divider />
                  <Grid.Row textAlign="center">
                    <Button color="yellow" stretch>Apply On This Job</Button>
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
            </Grid>
        
       
      );
    }
    return toBeReturned;
  }
}
export default Vacancy;
