import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";
import "../../styling/Footer.css";

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <h1>Logo Here</h1>
        <div className="footer-links">
          <Link to="/">Members</Link>
          <Link to="/">Partners</Link>
          <Link to="/">Life Coaches</Link>
          <Link to="/Vacancies">Vacancies</Link>
        </div>
        <div className="footer-icons">
          <h2>Follow Us</h2>
          <div>
            <Icon name="linkedin" clor="white" size="big" />
            <Icon name="facebook f" color="white" size="big" />
            <Icon name="twitter" color="white" size="big" />
          </div>
        </div>
        <div>
          <h2>Contact Us</h2>
          <p>Main Office: Tagamoaa</p>
          <p>Tel: 0123445566</p>
          <p>email: lirtenhub@gmail.com</p>
        </div>
        <div className="footer-signup">
          <Button onClick={this.props.login} className="login-button" inverted>
            Log In
          </Button>
          <Button onClick={this.props.redirectSignUp} inverted>
            Sign Up
          </Button>
        </div>
        <div className="footer-copyright">© 2019 Copyright: Overflow</div>
      </div>
    );
  }
}

export default Footer;
