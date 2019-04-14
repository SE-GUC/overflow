import React, { Component } from "react";
import decode from "jwt-decode";
import * as axios from "../services/axios";
import {
  Modal,
  Button,
  Header,
  Rating,
  Grid,
  Dimmer,
  Loader,
  Form,
  TextArea
} from "semantic-ui-react";
class EditProfileTest extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null
    };
  }
  componentDidMount() {
    let decoded = decode(localStorage.getItem("jwtToken"));
    let id = decoded.id;
    let url = "users/" + id;
    axios.get(url).then(user => {
      this.setState({ user: user });
    });
  }
  handleEdit = () => {
    this.props.history.push({
      pathname: "/EditProfile",
      user: this.state.user
    });
  };
  render() {
    const { user } = this.state;
    return !user ? (
      <div>
        <Dimmer active>
          <Loader size="huge" inverted />
        </Dimmer>
      </div>
    ) : (
      <Button onClick={this.handleEdit}>Edit NOw</Button>
    );
  }
}
export default EditProfileTest;
