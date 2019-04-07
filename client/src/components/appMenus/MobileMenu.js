import React, { Component } from "react";
import "../../styling/Menus.css";
import { Menu, Sidebar, Icon, Header, Divider } from "semantic-ui-react";

import MobileField from "./MobileField";
class MobileMenu extends Component {
  render() {
    const { isSidebarVisible, showSideBar } = this.props;
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
          borderless
          vertical
          inverted
          stackable
          direction="right"
          size="tiny"
        >
          <Menu.Item>
            <Header inverted> Profile Info Here </Header>
          </Menu.Item>
          <Divider fitted />
          <MobileField to="/" icon="users" name="Members" />
          <MobileField to="/" icon="building outline" name="Partners" />
          <MobileField to="/" icon="flag outline" name="Life Coaches" />
          <MobileField to="/Vacancies" icon="wpforms" name="Vacancies" />
          <MobileField to="/" name="Log in" />
          <MobileField to="/" name="Sign up" />
        </Sidebar>
      </div>
    );
  }
}
export default MobileMenu;
