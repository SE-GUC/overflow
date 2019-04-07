import React, { Component } from "react";
import { Menu, Button } from "semantic-ui-react";
import "../../styling/Menus.css";
import { Link } from "react-router-dom";
class DesktopMenu extends Component {
  render() {
    return (
      <Menu className="main-menu" borderless fixed="top">
        <Menu.Item>
          <Link className="mainMenu-link" to="/">
            Logo Here
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link className="mainMenu-link" to="/">
            Members
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link className="mainMenu-link" to="/">
            Partners
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link className="mainMenu-link" to="/">
            Life Coaches
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link className="mainMenu-link" to="/VacancyPage">
            Vacancies
          </Link>
        </Menu.Item>
        <Menu.Item position="right">
          <Button className="login-button" inverted>
            Log In
          </Button>
          <Button inverted> Sign Up </Button>
        </Menu.Item>
      </Menu>
    );
  }
}
export default DesktopMenu;
