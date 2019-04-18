import React, { Component } from "react";
import { Item, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "../../styling/Menus.css";

export default class NotificationItem extends Component {
  render() {
    const { notification, read } = this.props;
    const { link, date, title, body } = notification;
    return (
      <Item id={"no-back"}>
        <Item.Content id="item">
          <Header size="tiny">
            {title}
            <Header.Subheader>{date.slice(0, 15)}</Header.Subheader>
          </Header>
          <Item.Description style={{ fontSize: "0.8em" }}>
            {body}
          </Item.Description>
        </Item.Content>
      </Item>
    );
  }
}
