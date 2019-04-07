import React, { Component } from "react";
import "./App.css";
import { Responsive } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import DesktopMenu from "./components/appMenus/DesktopMenu.js";
import MobileMenu from "./components/appMenus/MobileMenu.js";
import LoginModal from "./components/login/LoginModal.js";
import Footer from "./components/footer/Footer.js";

class App extends Component {
  state = {
    isSidebarVisible: false,
    openLoginModal: false
  };
  showSideBar = () => {
    this.setState({ isSidebarVisible: true });
  };
  hideSidebar = () => {
    this.setState({ isSidebarVisible: false });
  };
  redirectSignUp = () => {
    this.props.history.push("/SignUp");
  };
  openLoginModal = () => {
    this.setState({ openLoginModal: true });
  };
  closeLoginModal = () => {
    this.setState({ openLoginModal: false });
  };

  render() {
    const { isSidebarVisible, openLoginModal } = this.state;
    return (
      <div>
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <DesktopMenu
            redirectSignUp={this.redirectSignUp}
            login={this.openLoginModal}
          />
          <div className="app-container">{this.props.children}</div>
        </Responsive>
        <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
          <MobileMenu
            showSideBar={this.showSideBar}
            isSidebarVisible={isSidebarVisible}
            login={this.openLoginModal}
          />
          <div
            onClick={this.hideSidebar}
            className="element app-container"
            //temp height (until there are children)
            style={{ overflow: "hidden", minHeight: "60em" }}
          >
            {this.props.children}
          </div>
        </Responsive>
        <LoginModal open={openLoginModal} close={this.closeLoginModal} />
         <Footer
          redirectSignUp={this.redirectSignUp}
          login={this.openLoginModal}
        />
      </div>
    );
  }
}

export default withRouter(App);
