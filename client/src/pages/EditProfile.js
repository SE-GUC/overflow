import React, { Component } from "react";
import { Responsive, Image, Grid } from "semantic-ui-react";
import SignUp from "../components/Signup/SignUpForm";
import EditProfileForm from "../components/profiles/EditProfileForm";
class EditProfile extends Component {
  redirect = ()=>{
    this.props.history.push("/");
  }
  render() {
    return (
      <div>
        <Responsive {...Responsive.onlyComputer}>
          <Grid columns={3}>
            <Grid.Column width={5} />
            <Grid.Column width={6}>
              <EditProfileForm
                redirect={this.redirect}
                user = {this.props.location.user}
              />
            </Grid.Column>
            <Grid.Column width={5}>
            
            </Grid.Column>
          </Grid>
        </Responsive>
        <Responsive {...Responsive.onlyTablet}>
          <EditProfileForm
             redirect={this.redirect}
             user = {this.props.location.user}
          />
        </Responsive>
        <Responsive {...Responsive.onlyMobile}>
          <EditProfileForm
            redirect={this.redirect}
            user = {this.props.location.user}
          />
        </Responsive>
      </div>
    );
  }
}
export default EditProfile;
