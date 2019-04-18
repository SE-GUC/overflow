import React, { Component } from "react";
import { Responsive, Image, Grid } from "semantic-ui-react";
import SignUp from "../components/Signup/SignUpForm";
import EditProfileForm from "../components/profiles/EditProfileForm";
class EditProfile extends Component {
  redirectProfile = (id, user) => {
    if (user.type === "partner") {
      console.log("IN PErnater AHO");
      this.props.history.push({
        pathname: "/Partner/" + id,
        state: { partner: user }
      });
    } else if (user.type === "lifeCoach") {
      this.props.history.push({
        pathname: "/LifeCoach/" + id,
        state: { lifeCoach: user }
      });
    } else if (user.type === "member") {
      this.props.history.push({
        pathname: "/Member/" + id,
        state: { member: user }
      });
    }
  };
  render() {
    return (
      <div>
        <Responsive {...Responsive.onlyComputer}>
          <Grid columns={3}>
            <Grid.Column width={5} />
            <Grid.Column width={6}>
              <EditProfileForm
                redirect={this.redirectProfile}
                user={this.props.location.user}
              />
            </Grid.Column>
            <Grid.Column width={5} />
          </Grid>
        </Responsive>
        <Responsive {...Responsive.onlyTablet}>
          <EditProfileForm
            redirect={this.redirect}
            user={this.props.location.user}
          />
        </Responsive>
        <Responsive {...Responsive.onlyMobile}>
          <EditProfileForm
            redirect={this.redirect}
            user={this.props.location.user}
          />
        </Responsive>
      </div>
    );
  }
}
export default EditProfile;
