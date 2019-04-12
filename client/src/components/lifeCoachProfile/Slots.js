import React, { Component } from "react";
import { Card, Icon, Header, Button } from "semantic-ui-react";
import decode from "jwt-decode";
import CreateSlotModal from "../../components/lifeCoachProfile/CreateSlotModal";

class Slots extends Component {
  state = {
    createModal: false
  };
  showAddButton = () => {
    if (!localStorage.getItem("jwtToken")) return false;
    return decode(localStorage.getItem("jwtToken")).id === this.props.id;
  };

  handleOpenCreateModal = () => {
    this.setState({ createModal: true });
  };

  handleCloseCreateModal = () => {
    this.setState({ createModal: false });
  };

  render() {
    const slots = this.props.lifeCoach.userData.monthlySlots;
    const { createModal } = this.state;
    return (
      <div className="slots-container">
        {createModal && (
          <CreateSlotModal
            onClose={this.handleCloseCreateModal}
            open={createModal}
            id={this.props.id}
            toggleLoading={this.props.toggleLoading}
            toggleError={this.props.toggleError}
            getLifeCoach={this.props.getLifeCoach}
          />
        )}
        <div className="slots-header-container">
          <Header as="h1">Upcoming Slots</Header>
          {this.showAddButton() && (
            <Button
              onClick={this.handleOpenCreateModal}
              icon="add"
              circular
              positive
            />
          )}
        </div>
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
