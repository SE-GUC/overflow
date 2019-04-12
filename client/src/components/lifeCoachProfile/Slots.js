import React, { Component } from "react";
import { Card, Icon, Header } from "semantic-ui-react";

class Slots extends Component {
  render() {
    const slots = this.props.lifeCoach.userData.monthlySlots;
    return (
      <div className="slots-container">
        <Header as="h1">Upcoming Slots</Header>
        <Card.Group className="slots-cards-container">
          {slots.filter(slot => new Date(slot.date) > Date.now()).map(slot => (
            <Card>
              <Card.Content>
                <Card.Header>{slot.date.substring(0, 10)}</Card.Header>
                <Card.Meta>
                  <span>{slot.date.substring(11, 16)}</span>
                  {slot.location && <span>{`/  ${slot.location}`}</span>}
                </Card.Meta>
                <Card.Description>
                  <span>
                    Booked{" "}
                    {slot.booked ? (
                      <Icon name="check" color="green" />
                    ) : (
                      <Icon name="close" color="red" />
                    )}
                  </span>
                  <span>
                    Confirmed{" "}
                    {slot.confirmed ? (
                      <Icon name="check" color="green" />
                    ) : (
                      <Icon name="close" color="red" />
                    )}
                  </span>
                </Card.Description>
                {slot.member && (
                  <Card.Description>{`Booked by: ${
                    slot.member.name
                  }`}</Card.Description>
                )}
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      </div>
    );
  }
}

export default Slots;
