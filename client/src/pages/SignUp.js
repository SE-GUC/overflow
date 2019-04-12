import React, { Component } from "react";
import decode from "jwt-decode";
import * as axios from "../services/axios.js";
import {
  Form,
  Grid,
  Header,
  Input,
  Button,
  Divider,
  Dropdown,
  Message,
  Container,
  Icon
} from "semantic-ui-react";
import "../styling/signup.css";
class SignUp extends React.Component {
  state = {
    userInfo: {
      email: "",
      password: "",
      name: "",
      phone: "",
      salary: "",
      isSuper: "",
      fax: "",
      address: "",
      approved: false,
      partners: [],
      members: [],
      projects: [],
      hourlyRate: "",
      type: "Member",
      dateOfBirth: "",
      image: "",
      gender: "",
      hourlyRate: "",
      skills: [],
      interests: [],
      availability: "",
      location: ""
    },
    memberAttrs: [
      "name",
      "dateOfBirth",
      "gender",
      "hourlyRate",
      "email",
      "skills",
      "interests",
      "password",
      "image",
      "availability",
      "location"
    ],
    partnerAttrs: [
      "name",
      "address",
      "email",
      "fax",
      "phone",
      "partners",
      "members",
      "projects",
      "password",
      "image",
      "approved"
    ],
    lifeCoachAttrs: [
      "name",
      "password",
      "dateOfBirth",
      "gender",
      "hourlyRate",
      "email",
      "image"
    ],

    options: [
      { key: "member", text: "Member", value: "Member" },

      {
        key: "lifeCoach",
        text: "LifeCoach",
        value: "LifeCoach"
      },
      {
        key: "partner",
        text: "Partner",
        value: "Partner"
      }
    ],
    errorContent: "",
    addedSkills: [],
    addedInterests: [],
    addedMembers: [],
    addedProjects: [],
    addedPartners: [],
    user_id: "",
    hidden: true
  };
  handleAllChanges = (prop, e) => {
    let { userInfo } = this.state;
    if (!Object.keys(userInfo)) return;
    Object.keys(userInfo).map(key => {
      if ("" + key == prop) {
        userInfo[key] = e.target.value;
      }
    });
    this.setState({ userInfo: userInfo });
  };
  componentDidMount() {
    this.setState({ reserveAttrs: this.state.userInfo });
  }
  checkInputArray = arr => {
    let result = true;
    arr.map(inp => {
      if (inp.length == 0) result = false;
    });
    return result;
  };
  checkInput = () => {
    let {
      email,
      password,
      type,
      name,
      dateOfBirth,
      gender
    } = this.state.userInfo;
    let allReq = [email, password, type, name];
    let MemReq = [dateOfBirth, gender];
    let AdminCoachReq = [dateOfBirth];
    if (!this.checkInputArray(allReq)) return false;
    if (type === "Member") {
      if (!this.checkInputArray(MemReq)) return false;
    } else if (type != "Partner")
      if (!this.checkInputArray(AdminCoachReq)) return false;
    return true;
  };
  handleDropChange = (e, { value }) => {
    let { userInfo } = this.state;
    if (userInfo) {
      userInfo["type"] = value;
      this.setState({ userInfo: userInfo });
    }
  };
  handleGenderChange = (e, { value }) => {
    let { userInfo } = this.state;
    if (userInfo) {
      userInfo["gender"] = value;
      this.setState({ userInfo: userInfo });
    }
  };
  handleAvailabilityDrop = (e, { value }) => {
    let { userInfo } = this.state;
    if (userInfo) {
      userInfo["availability"] = value;
      this.setState({ userInfo: userInfo });
    }
  };
  handleSkillAdd = (e, { value }) => {
    this.setState({
      addedSkills: [
        { key: value, text: value, value: value },
        ...this.state.addedSkills
      ]
    });
  };
  handleInterestAdd = (e, { value }) => {
    this.setState({
      addedInterests: [
        { key: value, text: value, value: value },
        ...this.state.addedInterests
      ]
    });
  };
  handlePartnerAdd = (e, { value }) => {
    this.setState({
      addedPartners: [
        { key: value, text: value, value: value },
        ...this.state.addedPartners
      ]
    });
  };
  handleProjectAdd = (e, { value }) => {
    this.setState({
      addedProjects: [
        { key: value, text: value, value: value },
        ...this.state.addedProjects
      ]
    });
  };
  handleMemberAdd = (e, { value }) => {
    this.setState({
      addedMembers: [
        { key: value, text: value, value: value },
        ...this.state.addedMembers
      ]
    });
  };
  //   handleChangeGeneral = (prop,e,{value}) => {
  //       console.log(e,value,"EVENT")
  //     // let { userInfo } = this.state;
  //     // if (userInfo) {
  //     //   userInfo[prop] = e.target.value;
  //     // }
  //     // this.setState({ userInfo: userInfo });
  //   };
  handleChangeSkill = (e, { value }) => {
    let { userInfo } = this.state;
    if (userInfo) {
      userInfo["skills"] = value;
    }
    this.setState({ userInfo: userInfo });
  };
  handleChangePartners = (e, { value }) => {
    let { userInfo } = this.state;
    if (userInfo) {
      userInfo["partners"] = value;
    }
    this.setState({ userInfo: userInfo });
  };
  handleChangeProjets = (e, { value }) => {
    let { userInfo } = this.state;
    if (userInfo) {
      userInfo["projects"] = value;
    }
    this.setState({ userInfo: userInfo });
  };
  handleChangeMembers = (e, { value }) => {
    let { userInfo } = this.state;
    if (userInfo) {
      userInfo["members"] = value;
    }
    this.setState({ userInfo: userInfo });
  };
  handleChangeInterest = (e, { value }) => {
    let { userInfo } = this.state;
    if (userInfo) {
      userInfo["interests"] = value;
    }
    this.setState({ userInfo: userInfo });
  };
  signUp = () => {
    let { type } = this.state.userInfo;
    let { memberAttrs, partnerAttrs, lifeCoachAttrs } = this.state;
    let url =
      type === "Member"
        ? "users/members/create"
        : type === "Partner"
          ? "users/partners/create/"
          : type === "LifeCoach"
            ? "users/lifeCoaches/create/"
            : "";
    let data = this.state.userInfo;
    let newData = {};
    Object.keys(data).map(key => {
      if (type === "Member") {
        if (
          data[key] != null &&
          data[key].length != 0 &&
          memberAttrs.includes(key)
        )
          newData[key] = data[key];
      } else if (type === "Partner") {
        if (
          data[key] != null &&
          data[key].length != 0 &&
          partnerAttrs.includes(key)
        )
          newData[key] = data[key];
      } else if (type === "LifeCoach") {
        if (
          data[key] != null &&
          data[key].length != 0 &&
          lifeCoachAttrs.includes(key)
        )
          newData[key] = data[key];
      }
    });
    console.log(data, "Data");
    console.log(newData, "New Data");
    axios
      .post(url, newData)
      .then(data => {
        this.setState({ hidden: true });
        console.log(data);
        let body = {
          email: newData.email,
          password: newData.password
        };
        axios
          .post("users/login", body)
          .then(data => {
            console.log(data.data.data, "After Login");
            localStorage.setItem("jwtToken", data.data.data);
            this.redirect();
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        this.setState({
          errorContent: error.response.data.error,
          hidden: false
        });
      });
  };
  redirect = () => {
    this.props.history.push("/");
  };

  render() {
    let {
      email,
      password,
      name,
      phone,
      salary,
      isSuper,
      fax,
      partners,
      members,
      projects,
      hourlyRate,
      type,
      dateOfBirth,
      image,
      gender,
      address,
      skills,
      interests,
      availability,
      location
    } = this.state.userInfo;
    let genderOptions = [
      { key: "male", text: "Male", value: "Male" },
      { key: "female", text: "Female", value: "Female" }
    ];
    let availabilityOptions = [
      { key: "part", text: "Part-Time", value: "part-time" },
      { key: "full", text: "Full-Time", value: "full-time" }
    ];
    let {
      options,
      hidden,
      addedSkills,
      errorContent,
      addedInterests,
      addedPartners,
      addedMembers,
      addedProjects
    } = this.state;

    return (
      //   <div class="signup">
      <Grid centered container id="signup" stackable>
        <Container>
          <Grid.Row id="header-row">
            <Header as="h1"> SignUp to LirtenHub </Header>
          </Grid.Row>
          <Form size="big" error onSubmit={this.signUp}>
            <Form.Field required>
              <label>Name</label>
              <Input
                type="name"
                iconPosition="left"
                icon="male"
                name="name"
                value={name}
                onChange={e => this.handleAllChanges("name", e)}
                placeholder="Peter Johnson"
              />
            </Form.Field>
            <Form.Field required>
              <label>Email</label>
              <Input
                type="email"
                iconPosition="left"
                icon="mail"
                name="Email"
                value={email}
                onChange={e => this.handleAllChanges("email", e)}
                placeholder="example@gmail.com"
              />
            </Form.Field>
            <Form.Field required>
              <label>Password</label>
              <Input
                icon="lock"
                iconPosition="left"
                type="password"
                name="password"
                value={password}
                onChange={e => this.handleAllChanges("password", e)}
              />
            </Form.Field>
            <Form.Field required>
              <label>UserType</label>
              <Dropdown
                floating
                options={options}
                selection
                value={type}
                onChange={this.handleDropChange}
              />
            </Form.Field>
            {type === "Member"
              ? [
                <Form.Group widths="equal">
                  <Form.Input
                    type="date"
                    value={dateOfBirth}
                    onChange={e => this.handleAllChanges("dateOfBirth", e)}
                    required
                      label="Birth Date"
                    />
                    <Form.Field required>
                      <label>Gender</label>
                      <Dropdown
                        options={genderOptions}
                        selection
                        value={gender}
                        onChange={this.handleGenderChange}
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>Skills</label>
                      <Dropdown
                        options={addedSkills}
                        selection
                        multiple
                        allowAdditions
                        search
                        value={skills}
                        onAddItem={this.handleSkillAdd}
                        onChange={this.handleChangeSkill}
                      />
                    </Form.Field>
                  </Form.Group>,
                  <Form.Group widths="equal">
                    <Form.Field>
                      <label>Interests</label>
                      <Dropdown
                        options={addedInterests}
                        selection
                        multiple
                        allowAdditions
                        search
                        value={interests}
                        onAddItem={this.handleInterestAdd}
                        onChange={this.handleChangeInterest}
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>Availability</label>
                      <Dropdown
                        options={availabilityOptions}
                        selection
                        value={availability}
                        onChange={this.handleAvailabilityDrop}
                      />
                    </Form.Field>
                    <Form.Input
                      value={location}
                      onChange={e => this.handleAllChanges("location", e)}
                      label="Location"
                    />
                  </Form.Group>,
                  <Form.Group widths="equal">
                    <Form.Input
                      value={hourlyRate}
                      onChange={e => this.handleAllChanges("hourlyRate", e)}
                      label="Hourly Rate"
                    />
                    <Form.Input
                      value={image}
                      onChange={e => this.handleAllChanges("image", e)}
                      label="Image Link"
                    />
                  </Form.Group>
                ]
              : null}
            {type === "Partner"
              ? [
                  <Form.Group widths="equal">
                    <Form.Input
                      value={fax}
                      onChange={e => this.handleAllChanges("fax", e)}
                      label="Fax"
                    />

                    <Form.Input
                      value={phone}
                      onChange={e => this.handleAllChanges("phone", e)}
                      label="Phone"
                    />
                    <Form.Input
                      value={address}
                      onChange={e => this.handleAllChanges("address", e)}
                      label="Address"
                    />
                    <Form.Input
                      value={image}
                      onChange={e => this.handleAllChanges("image", e)}
                      label="Image Link"
                    />
                  </Form.Group>,
                  <Form.Group widths="equal">
                    <Form.Field>
                      <label>Partners</label>
                      <Dropdown
                        options={addedPartners}
                        selection
                        multiple
                        allowAdditions
                        search
                        value={partners}
                        onAddItem={this.handlePartnerAdd}
                        onChange={this.handleChangePartners}
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>Members</label>
                      <Dropdown
                        options={addedMembers}
                        selection
                        multiple
                        allowAdditions
                        search
                        value={members}
                        onAddItem={this.handleMemberAdd}
                        onChange={this.handleChangeMembers}
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>Projects</label>
                      <Dropdown
                        options={addedProjects}
                        selection
                        multiple
                        allowAdditions
                        search
                        value={projects}
                        onAddItem={this.handleProjectAdd}
                        onChange={this.handleChangeProjets}
                      />
                    </Form.Field>
                  </Form.Group>
                ]
              : null}
            {type === "LifeCoach"
              ? [
                  <Form.Group widths="equal">
                    <Form.Input
                      type="date"
                      value={dateOfBirth}
                      onChange={e => this.handleAllChanges("dateOfBirth", e)}
                      required
                      label="Birth Date"
                    />
                    <Form.Field required>
                      <label>Gender</label>
                      <Dropdown
                        options={genderOptions}
                        selection
                        value={gender}
                        onChange={this.handleGenderChange}
                      />
                    </Form.Field>
                    <Form.Input
                      value={hourlyRate}
                      onChange={e => this.handleAllChanges("hourlyRate", e)}
                      label="Hourly Rate"
                    />
                    <Form.Input
                      value={image}
                      onChange={e => this.handleAllChanges("image", e)}
                      label="Image Link"
                    />
                  </Form.Group>
                ]
              : null}

            <Form.Field>
              <Button
                onClick={this.signUp}
                fluid
                disabled={!this.checkInput()}
                color="yellow"
                type="submit"
              >
                Sign Up
              </Button>
            </Form.Field>
          </Form>
          <Message icon hidden={hidden} error size="small">
            <Icon name="times circle" />
            <Message.Content>
              <Message.Header>{errorContent}</Message.Header>
            </Message.Content>
          </Message>
        </Container>
      </Grid>
      //   </div>
    );
  }
}

export default SignUp;
