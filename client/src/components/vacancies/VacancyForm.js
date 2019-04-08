import React, { Component } from "react";
import {
  Grid,
  Form,
  Dropdown,
  Button,
  Header,
  Divider
} from "semantic-ui-react";
import "../../styling/VacancyForm.css";
import * as Axios from "../../services/axios.js";

export default class VacancyForm extends Component {
  state = {
    title: "",
    monthlyWage: "",
    currency: "",
    location: "",
    startDate: "",
    endDate: "",
    dailyHours: "",
    availability: "",
    description: "",
    currentValues: [],
    loader: false,
    errorHidden: true,
    errorMessage: "",
    availabilityOptions: [
      { key: 1, text: "Full-Time", value: "fullTime" },
      { key: 2, text: "Part-Time", value: "partTime" }
    ],
    skillOptions: []
  };
  handleAddition = (e, { value }) => {
    this.setState({
      skillOptions: [{ text: value, value }, ...this.state.skillOptions]
    });
  };
  handleSkillChange = (e, { value }) => this.setState({ currentValues: value });
  changeDropDown = (e, { value }) => this.setState({ availability: value });
  handleAllChanges = (prop, e) => {
    const newState = this.state;
    newState[prop] = e.target.value;
    newState.errorHidden = true;
    this.setState(newState);
  };
  createVacancy = () => {
    this.setState({ loader: true });
    const { partnerId } = this.props;
    const {
      availability,
      currency,
      currentValues,
      dailyHours,
      description,
      endDate,
      location,
      startDate,
      title
    } = this.state;
    let { monthlyWage } = this.state;
    monthlyWage += currency;
    const url = "vacancies/create";
    const data = {
      partnerId,
      skills: currentValues,
      dailyHours,
      description,
      endDate,
      location,
      startDate,
      title,
      monthlyWage,
      availability
    };

    //deleting any empty props incase they are empty
    Object.keys(data).forEach(key => {
      if (data[key].length === 0) delete data[key];
    });
    Axios.post(url, data)
      .then(resp => {
        this.setState({ loader: false });
        //Goes to Vacancy Page here
      })
      .catch(error => {
        this.setState({ loader: false });
        if (error.response.data.error) {
          this.setState({
            errorMessage: error.response.data.error,
            errorHidden: false
          });
        } else {
          this.setState({
            errorMessage: "Something went wrong",
            errorHidden: false
          });
        }
      });
  };

  render() {
    const {
      availabilityOptions,
      skillOptions,
      currentValues,
      availability,
      title,
      monthlyWage,
      currency,
      location,
      startDate,
      endDate,
      dailyHours,
      description,
      loader,
      errorHidden,
      errorMessage
    } = this.state;
    const { isMobile } = this.props;
    const formSize = isMobile ? "tiny" : "large";
    const vacancyDuration = [
      <Form.Input
        key="startDate"
        value={startDate}
        type="Date"
        label="Start Date"
        onChange={e => {
          this.handleAllChanges("startDate", e);
        }}
      />,
      <Form.Input
        key="endDate"
        value={endDate}
        type="Date"
        label="End Date"
        onChange={e => {
          this.handleAllChanges("endDate", e);
        }}
      />
    ];

    return (
      <Grid centered padded>
        <Grid.Row>
          <Form
            inverted
            error
            className="box-shadow"
            size={formSize}
            onSubmit={this.createVacancy}
          >
            <Header inverted size="huge" textAlign="left">
              Create Vacancy
              <Header.Subheader>Submit a vacancy for approval</Header.Subheader>
            </Header>
            <Form.Input
              onChange={e => {
                this.handleAllChanges("title", e);
              }}
              value={title}
              type="text"
              label="Title"
              required
            />
            <Form.Group>
              <Form.Input
                value={monthlyWage}
                width={14}
                type="Number"
                label="Monthly Wage"
                onChange={e => {
                  this.handleAllChanges("monthlyWage", e);
                }}
              />
              <Form.Input
                value={currency}
                width={3}
                label="Currency"
                type="text"
                onChange={e => {
                  this.handleAllChanges("currency", e);
                }}
              />
            </Form.Group>
            <Form.Input
              value={location}
              type="text"
              label="Location"
              onChange={e => {
                this.handleAllChanges("location", e);
              }}
            />
            {isMobile ? (
              vacancyDuration
            ) : (
              <Form.Group>{vacancyDuration}</Form.Group>
            )}
            <Form.Input
              key="hours"
              required
              value={dailyHours}
              type="Number"
              label="Daily Hours"
              onChange={e => {
                this.handleAllChanges("dailyHours", e);
              }}
            />
            <Form.Field>
              <label> Availability </label>
              <Dropdown
                options={availabilityOptions}
                onChange={this.changeDropDown}
                value={availability}
                selection
              />
            </Form.Field>
            <Form.Field>
              <label>Skills</label>
              <Dropdown
                options={skillOptions}
                placeholder="Add skills"
                search
                selection
                multiple
                allowAdditions
                value={currentValues}
                onAddItem={this.handleAddition}
                onChange={this.handleSkillChange}
                noResultsMessage=""
              />
            </Form.Field>
            <Form.TextArea
              required
              value={description}
              label="Description"
              onChange={e => {
                this.handleAllChanges("description", e);
              }}
            />

            <Button loading={loader} fluid color="yellow" type="submit">
              Create
            </Button>
            {errorHidden ? (
              ""
            ) : (
              <span style={{ color: "red" }}> {errorMessage}</span>
            )}
          </Form>
        </Grid.Row>
      </Grid>
    );
  }
}
