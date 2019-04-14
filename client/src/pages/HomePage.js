import React, { Component } from "react";
import { List, Header, Grid } from "semantic-ui-react";

export default class HomePage extends Component {
  render() {
    return (
      <Grid style={{ marginTop: "5em", marginLeft: "2em" }}>
        <Grid.Row>
          <Header textAlign="center">Overflow Team Notes</Header>
        </Grid.Row>
        <Grid.Row>
          <List ordered>
            <List.Item>
              Still in progress Items (not deployed )
              <List.List>
                <List.Item>Landing page (will be here)</List.Item>
                <List.Item>Member profile page</List.Item>
                <List.Item>Some admin privileges</List.Item>
                <List.Item>
                  Recommendations using recombee API (finished backend,not
                  integrated on the front-end yet)
                </List.Item>
                <List.Item>
                  Notifications using google firebase (finished backend,not
                  integrated on the front-end yet)
                </List.Item>
                <List.Item>Deleting Profiles</List.Item>
              </List.List>
            </List.Item>
            <List.Item>
              Some Account credentials:
              <List.List>
                <List.Item>
                  Member: tristana@hotmail.com, password:test
                </List.Item>
                <List.Item>Partner: apple@hotmail.com, password:test</List.Item>
                <List.Item>Admin: philip@admin.com, password:test</List.Item>
                <List.Item>
                  LifeCoach: philip@got.com, password:khara20
                </List.Item>
              </List.List>
            </List.Item>
            <List.Item>
              This website is fully resposnive (works on all screen sizes)
            </List.Item>
          </List>
        </Grid.Row>
      </Grid>
    );
  }
}
