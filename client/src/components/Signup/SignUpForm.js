import React, { Component } from "react";
import decode from "jwt-decode";
import * as axios from "../../services/axios.js";
import {
  Form,
  Grid,
  Header,
  Input,
  Button,
  Divider,
  Dropdown,
  Segment,
  Message,
  Container,
  Dimmer,
  Loader,
  Icon
} from "semantic-ui-react";
import "../../styling/signup.css";
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
      fieldOfWork: "",
      type: "Partner",
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
      "fieldOfWork",
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
    loading: false,
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
    this.setState({ loading: true });
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
            this.setState({ loading: false });
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
    this.props.redirect();
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
      fieldOfWork,
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
      loading,
      addedMembers,
      addedProjects
    } = this.state;

    return (
      //   <div class="signup">
      loading ? (
        <div>
          <Dimmer active>
            <Loader size="huge" inverted />
          </Dimmer>
        </div>
      ) : (
        <Grid id="signup" columns={1} centered stackable>
          <Grid.Row columns={1} id="header-row">
            <Grid.Column textAlign="center">
              <Form
                inverted
                size="big"
                widths={16}
                error
                onSubmit={this.signUp}
              >
                <Header inverted as="h1">
                  {" "}
                  Join LirtenHub{" "}
                </Header>
                <Form.Field required>
                  <label>Name</label>
                  <Input
                    inverted
                    fluid
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
                    fluid
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
                    fluid
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
                    fluid
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
                          fluid
                          type="date"
                          value={dateOfBirth}
                          onChange={e =>
                            this.handleAllChanges("dateOfBirth", e)
                          }
                          required
                          label="Birth Date"
                        />
                        {/* <Form.Field required>
                        <label>Gender</label> */}
                        <Form.Dropdown
                          fluid
                          options={genderOptions}
                          label="Gender"
                          selection
                          value={gender}
                          onChange={this.handleGenderChange}
                        />
                        {/* </Form.Field> */}
                      </Form.Group>,

                      <Form.Field>
                        <label>Skills</label>
                        <Form.Dropdown
                          options={addedSkills}
                          selection
                          fluid
                          multiple
                          allowAdditions
                          search
                          value={skills}
                          onAddItem={this.handleSkillAdd}
                          onChange={this.handleChangeSkill}
                          noResultsMessage=""
                        />
                      </Form.Field>,

                      <Form.Field>
                        <label>Interests</label>
                        <Form.Dropdown
                          options={addedInterests}
                          selection
                          fluid
                          multiple
                          allowAdditions
                          search
                          value={interests}
                          onAddItem={this.handleInterestAdd}
                          onChange={this.handleChangeInterest}
                          noResultsMessage=""
                        />
                      </Form.Field>,
                      <Form.Group widths="equal">
                        <Form.Dropdown
                          options={availabilityOptions}
                          selection
                          fluid
                          label="Availability"
                          value={availability}
                          onChange={this.handleAvailabilityDrop}
                        />

                        <Form.Input
                          fluid
                          value={location}
                          onChange={e => this.handleAllChanges("location", e)}
                          label="Location"
                        />
                      </Form.Group>,
                      <Form.Input
                        value={image}
                        onChange={e => this.handleAllChanges("image", e)}
                        label="Image Link"
                      />
                    ]
                  : null}
                {type === "Partner"
                  ? [
                      <Form.Input
                        value={fieldOfWork}
                        fluid
                        onChange={e => this.handleAllChanges("fieldOfWork", e)}
                        label="Work Field"
                      />,
                      <Form.Group widths="equal">
                        <Form.Input
                          value={fax}
                          fluid
                          onChange={e => this.handleAllChanges("fax", e)}
                          label="Fax"
                        />

                        <Form.Input
                          value={phone}
                          fluid
                          onChange={e => this.handleAllChanges("phone", e)}
                          label="Phone"
                        />
                      </Form.Group>,
                      <Form.Group widths="equal">
                        <Form.Input
                          value={address}
                          fluid
                          onChange={e => this.handleAllChanges("address", e)}
                          label="Address"
                        />
                        <Form.Input
                          value={image}
                          // width={16}
                          fluid
                          onChange={e => this.handleAllChanges("image", e)}
                          label="Link"
                        />
                      </Form.Group>,
                      <Form.Field>
                        <Form.Dropdown
                          label="Partners"
                          options={addedPartners}
                          selection
                          multiple
                          allowAdditions
                          search
                          width={16}
                          value={partners}
                          onAddItem={this.handlePartnerAdd}
                          onChange={this.handleChangePartners}
                          noResultsMessage=""
                        />
                      </Form.Field>,
                      <Form.Field>
                        <Form.Dropdown
                          options={addedMembers}
                          selection
                          label="Members"
                          multiple
                          fluid
                          allowAdditions
                          search
                          value={members}
                          onAddItem={this.handleMemberAdd}
                          onChange={this.handleChangeMembers}
                          noResultsMessage=""
                        />
                      </Form.Field>,
                      <Form.Field>
                        <Form.Dropdown
                          options={addedProjects}
                          selection
                          multiple
                          label="Projects"
                          allowAdditions
                          search
                          fluid
                          value={projects}
                          onAddItem={this.handleProjectAdd}
                          onChange={this.handleChangeProjets}
                          noResultsMessage=""
                        />
                      </Form.Field>
                    ]
                  : null}
                {type === "LifeCoach"
                  ? [
                      <Form.Group widths="equal">
                        <Form.Input
                          type="date"
                          value={dateOfBirth}
                          onChange={e =>
                            this.handleAllChanges("dateOfBirth", e)
                          }
                          required
                          fluid
                          label="Birth Date"
                        />
                        <Form.Field required>
                          <label>Gender</label>
                          <Dropdown
                            options={genderOptions}
                            selection
                            fluid
                            value={gender}
                            onChange={this.handleGenderChange}
                          />
                        </Form.Field>
                      </Form.Group>,
                      <Form.Group>
                        <Form.Input
                          value={hourlyRate}
                          fluid
                          onChange={e => this.handleAllChanges("hourlyRate", e)}
                          label="Hour Rate"
                        />
                        <Form.Input
                          value={image}
                          onChange={e => this.handleAllChanges("image", e)}
                          label="Image Link"
                        />
                      </Form.Group>
                    ]
                  : null}

                <Button
                  disabled={!this.checkInput()}
                  color="yellow"
                  type="submit"
                >
                  Sign Up
                </Button>
              </Form>

              <Message icon hidden={hidden} error size="small">
                <Icon name="times circle" />
                <Message.Content>
                  <Message.Header>{errorContent}</Message.Header>
                </Message.Content>
              </Message>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )

      //   </div>
    );
  }
}

export default SignUp;
