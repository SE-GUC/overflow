import React, { Component } from "react";
import "./App.css";
import { Responsive } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import DesktopMenu from "./components/appMenus/DesktopMenu.js";
import MobileMenu from "./components/appMenus/MobileMenu.js";
import LoginModal from "./components/login/LoginModal.js";
import Footer from "./components/footer/Footer.js";
import decode from "jwt-decode";
class App extends Component {
  state = {
    isSidebarVisible: false,
    openLoginModal: false
  };
  componentDidMount() {
    this.setToken();
  }
  setToken = () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) return;
    const userInfo = decode(token);
    this.setState({ userInfo });
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
  logOut = () => {
    localStorage.removeItem("jwtToken");
    const newState = this.state;
    delete newState.userInfo;
    this.setState(newState);
  };

  render() {
    const { isSidebarVisible, openLoginModal, userInfo } = this.state;
    return (
      <div className="app-wrapper">
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <DesktopMenu
            redirectSignUp={this.redirectSignUp}
            login={this.openLoginModal}
            userInfo={userInfo}
            logOut={this.logOut}
          />
          <div className="app-container">{this.props.children}</div>
        </Responsive>
        <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
          <MobileMenu
            showSideBar={this.showSideBar}
            isSidebarVisible={isSidebarVisible}
            login={this.openLoginModal}
            userInfo={userInfo}
            logOut={this.logOut}
          />
          <div
            onClick={this.hideSidebar}
            className="element app-container"
            //temp height (until there are children)
            style={{ minHeight: "60em" }}
          >
            {this.props.children}
          </div>
        </Responsive>
        <LoginModal
          setToken={this.setToken}
          open={openLoginModal}
          close={this.closeLoginModal}
        />
        <Footer
          logOut={this.logOut}
          userInfo={userInfo}
          redirectSignUp={this.redirectSignUp}
          login={this.openLoginModal}
        />
      </div>
    );
  }
}

export default withRouter(App);
