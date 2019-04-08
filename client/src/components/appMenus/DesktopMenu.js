import React, { Component } from "react";
import { Menu, Button } from "semantic-ui-react";
import "../../styling/Menus.css";
import { Link } from "react-router-dom";
import DesktopField from "./Desktopfield.js";
class DesktopMenu extends Component {
  render() {
    return (
      <Menu className="main-menu" borderless fixed="top">
        <Menu.Item>
          <Link className="mainMenu-link" to="/">
            Logo Here
          </Link>
        </Menu.Item>
        <DesktopField to="/" icon="users" text="Members" />
        <DesktopField to="/" icon="building outline" text="Partners" />
        <DesktopField to="/" icon="flag" text="Life Coaches" />
        <DesktopField to="/Vacancies" icon="wpforms" text="Vacancies" />
        <Menu.Item position="right">
          <Button onClick={this.props.login} className="login-button" inverted>
            Log In
          </Button>
          <Button  onClick={this.props.redirectSignUp} inverted>
            Sign Up
          </Button>
        </Menu.Item>
      </Menu>
    );
  }
}
export default DesktopMenu;
