import React, { Component } from "react";
import "./App.css";
import { Responsive } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import DesktopMenu from "./components/appMenus/DesktopMenu.js";
import MobileMenu from "./components/appMenus/MobileMenu.js";
class App extends Component {
  state = {
    isSidebarVisible: false
  };
  showSideBar = () => {
    this.setState({ isSidebarVisible: true });
  };
  hideSidebar = () => {
    this.setState({ isSidebarVisible: false });
  };
  render() {
    const { isSidebarVisible } = this.state;
    return (
      <div>
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <DesktopMenu />
          <div className="app-container">{this.props.children}</div>
        </Responsive>
        <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
          <MobileMenu
            showSideBar={this.showSideBar}
            isSidebarVisible={isSidebarVisible}
          />

          <div
            onClick={this.hideSidebar}
            className="element app-container"
            //temp height (until there are children)
            style={{ overflow: "hidden", "min-height": "60em" }}
          >
            {this.props.children}
          </div>
        </Responsive>
      </div>
    );
  }
}

export default withRouter(App);
