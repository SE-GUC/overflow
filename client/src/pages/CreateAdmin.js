import React, { Component } from "react";
import { Responsive, Grid } from "semantic-ui-react";
import AdminForm from "../components/admin/AdminForm";
class CreateAdmin extends Component {
  render() {
    return (
      <div>
        <Responsive {...Responsive.onlyComputer}>
          <Grid columns={3}>
            <Grid.Column />
            <Grid.Column>
              <AdminForm isMobile={false} />
            </Grid.Column>
            <Grid.Column />
          </Grid>
        </Responsive>
        <Responsive {...Responsive.onlyTablet}>
          <AdminForm isMobile={false} />
        </Responsive>
        <Responsive {...Responsive.onlyMobile}>
          <AdminForm isMobile={true} />
        </Responsive>
      </div>
    );
  }
}
export default CreateAdmin;
