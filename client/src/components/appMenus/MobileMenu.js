import React, { Component } from "react";
import "../../styling/Menus.css";
import { Menu, Sidebar, Icon, Header, Divider, Image } from "semantic-ui-react";

import MobileField from "./MobileField";
class MobileMenu extends Component {
  render() {
    const {
      isSidebarVisible,
      showSideBar,
      userInfo,
      login,
      logOut
    } = this.props;
    return (
      <div>
        <Menu className="main-menu mobile-menu" borderless fixed="top">
          <Menu.Item>
            <Header inverted>Lirten Hub</Header>
          </Menu.Item>
          <Menu.Item position="right">
            <Icon size="big" inverted name="sidebar" onClick={showSideBar} />
          </Menu.Item>
        </Menu>
        <Sidebar
          as={Menu}
          animation="overlay"
          width="thin"
          visible={isSidebarVisible}
          vertical
          inverted
          stackable
          direction="right"
          size="tiny"
        >
          {userInfo ? (
            <Menu.Item onClick={this.props.redirectProfile}>
              <Image
                className="user-menu"
                src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                avatar
              />
              <Header size="small" className="profile-header" inverted>
                {userInfo.name}
              </Header>
              <Header size="small" inverted>
                {userInfo.email}
              </Header>
            </Menu.Item>
          ) : null}
          <Divider fitted />
          <MobileField to="/Members" icon="users" name="Members" />
          <MobileField to="/Partners" icon="building outline" name="Partners" />
          <MobileField
            to="/LifeCoaches"
            icon="flag outline"
            name="Life Coaches"
          />
          <MobileField to="/Vacancies" icon="wpforms" name="Vacancies" />
          {userInfo ? (
            <Menu.Item onClick={logOut}>
              <Header textAlign="center" icon inverted>
                Log out
              </Header>
            </Menu.Item>
          ) : (
            [
              <Menu.Item key="login" onClick={login}>
                <Header textAlign="center" icon inverted>
                  Log In
                </Header>
              </Menu.Item>,
              <MobileField key="signUp" to="/SignUp" name="Sign up" />
            ]
          )}
        </Sidebar>
      </div>
    );
  }
}
export default MobileMenu;
