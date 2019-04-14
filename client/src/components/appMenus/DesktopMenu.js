import React, { Component } from "react";
import { Menu, Button, Icon, Image, Dropdown } from "semantic-ui-react";
import "../../styling/Menus.css";
import { Link } from "react-router-dom";
import DesktopField from "./Desktopfield.js";
import { withRouter } from "react-router-dom";

class DesktopMenu extends Component {
  state = {
    openDropDown: false
  };
  openDropDown = () => {
    this.setState({ openDropDown: true });
  };
  closeDropDown = () => {
    this.setState({ openDropDown: false });
  };

  render() {
    const { openDropDown } = this.state;
    const { userInfo, logOut, login, redirectSignUp } = this.props;
    console.log(userInfo);
    return (
      <Menu className="main-menu" borderless fixed="top">
        <Menu.Item>
          <Link className="mainMenu-link" to="/">
            Logo Here
          </Link>
        </Menu.Item>
        <DesktopField to="/Members" icon="users" text="Members" />
        <DesktopField to="/Partners" icon="building outline" text="Partners" />
        <DesktopField to="/LifeCoaches" icon="flag" text="Life Coaches" />
        <DesktopField to="/Vacancies" icon="wpforms" text="Vacancies" />
        <Menu.Item position="right">
          {userInfo ? (
            <div>
              <Image
                className="user-menu"
                src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                avatar
                style={{ cursor: "pointer" }}
                onClick={this.props.redirectProfile}
                onMouseEnter={this.openDropDown}
                onMouseLeave={this.closeDropDown}
              />
              <Dropdown
                icon=""
                id="drop-options"
                pointing="top left"
                open={openDropDown}
              >
                <Dropdown.Menu>
                  <Dropdown.Header> {userInfo.name} </Dropdown.Header>
                  <Dropdown.Header>{userInfo.email}</Dropdown.Header>
                </Dropdown.Menu>
              </Dropdown>
              <Icon
                className="mainMenu-link"
                size="big"
                name="bell outline"
                inverted
              />

              <Button onClick={logOut} inverted>
                Log out
              </Button>
            </div>
          ) : (
            <div>
              <Button onClick={login} className="login-button" inverted>
                Log In
              </Button>
              <Button onClick={redirectSignUp} inverted>
                Sign Up
              </Button>
            </div>
          )}
        </Menu.Item>
      </Menu>
    );
  }
}
export default withRouter(DesktopMenu);
