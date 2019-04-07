import React, { Component } from "react";
import {
  Form,
  Modal,
  Message,
  Grid,
  Header,
  Icon,
  Input,
  Button
} from "semantic-ui-react";
import "../../styling/Login.css";
import * as Axios from "../../services/axios.js";
export default class LoginModal extends Component {
  state = {
    email: "",
    password: "",
    hidden: true,
    loading: false
  };
  changePassword = e => {
    this.setState({ password: e.target.value, hidden: true });
  };
  changeMail = e => {
    this.setState({ email: e.target.value, hidden: true });
  };

  resetModal = () => {
    this.setState({
      email: "",
      password: "",
      hidden: true,
      error: "",
      loading: false
    });
    this.props.close();
  };
  login = () => {
    this.setState({ loading: true });
    const { email, password } = this.state;
    const body = { email, password };
    Axios.post("users/login", body)
      .then(data => {
        localStorage.setItem("jwtToken", data.data.data);
        this.resetModal();
      })
      .catch(error => {
        this.setState({
          error: error.response.data.error,
          hidden: false,
          loading: false
        });
      });
  };

  render() {
    const { open } = this.props;
    const { email, password, hidden, error, loading } = this.state;
    return (
      <Modal basic onClose={this.resetModal} open={open}>
        <Grid columns={2} centered>
          <Grid.Column computer={6} mobile={11}>
            <Grid.Row id="header-cont">
              <Header inverted id="header">
                Lirten Hub Login
              </Header>
            </Grid.Row>
            <Form padded id="login-form" error onSubmit={this.login}>
              {hidden ? null : (
                <Message error icon size="small">
                  <Icon name="times circle" />
                  <Message.Content>
                    <Message.Header>{error}</Message.Header>
                    Please try again
                  </Message.Content>
                </Message>
              )}
              <Form.Field className="login-field first-field" required>
                <label>Email</label>
                <Input
                  type="email"
                  iconPosition="left"
                  icon="mail"
                  name="Email"
                  value={email}
                  onChange={this.changeMail}
                  placeholder="ex@gmail.com"
                />
              </Form.Field>
              <Form.Field className="login-field" required>
                <label>Password</label>
                <Input
                  icon="lock"
                  iconPosition="left"
                  type="password"
                  name="email"
                  value={password}
                  onChange={this.changePassword}
                />
              </Form.Field>
              <Button fluid loading={loading} type="submit" color="yellow">
                Log In
              </Button>
            </Form>
          </Grid.Column>
        </Grid>
      </Modal>
    );
  }
}
