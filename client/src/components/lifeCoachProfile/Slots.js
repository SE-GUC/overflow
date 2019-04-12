import React, { Component } from "react";
import { Card, Icon, Header, Button } from "semantic-ui-react";
import decode from "jwt-decode";
import CreateSlotModal from "./CreateSlotModal";
import LocationModal from "./LocationModal";
import { put, del } from "../../services/axios";

class Slots extends Component {
  state = {
    createModal: false,
    locationModal: false,
    setLocationSlot: {}
  };
  showAddButton = () => {
    if (!localStorage.getItem("jwtToken")) return false;
    return decode(localStorage.getItem("jwtToken")).id === this.props.id;
  };

  showBookButton = () => {
    if (!localStorage.getItem("jwtToken")) return false;
    return decode(localStorage.getItem("jwtToken")).type === "member";
  };

  handleOpenCreateModal = () => {
    this.setState({ createModal: true });
  };

  handleCloseCreateModal = () => {
    this.setState({ createModal: false });
  };

  handleOpenLocationModal = slot => {
    this.setState({
      locationModal: true,
      setLocationSlot: slot
    });
  };

  handleCloseLocationModal = () => {
    this.setState({ locationModal: false });
  };

  handleBook = (date, lifeCoachId, slotId) => {
    const body = {
      date,
      booked: true,
      confirmed: false,
      memberId: decode(localStorage.getItem("jwtToken")).id
    };
    this.props.toggleLoading();
    put("slots/update/" + lifeCoachId + "/" + slotId, body)
      .then(response => {
        this.props.getLifeCoach();
      })
      .catch(error => {
        this.props.toggleError();
        this.props.toggleLoading();
      });
  };

  handleConfirm = (slot, lifeCoachId) => {
    const { booked, date, location, member, _id } = slot;
    const body = {
      date,
      booked,
      location,
      memberId: member._id,
      confirmed: true
    };
    this.props.toggleLoading();
    put("slots/update/" + lifeCoachId + "/" + _id, body)
      .then(response => {
        this.props.getLifeCoach();
      })
      .catch(error => {
        this.props.toggleError();
        this.props.toggleLoading();
      });
  };

  handleDelete = (slotId, lifeCoachId) => {
    this.props.toggleLoading();
    del("slots/delete/" + lifeCoachId + "/" + slotId)
      .then(response => {
        this.props.getLifeCoach();
      })
      .catch(error => {
        this.props.toggleError();
        this.props.toggleLoading();
      });
  };

  render() {
    const slots = this.props.lifeCoach.userData.monthlySlots;
    const { createModal, locationModal, setLocationSlot } = this.state;
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
        {locationModal && (
          <LocationModal
            onClose={this.handleCloseLocationModal}
            open={locationModal}
            id={this.props.id}
            toggleLoading={this.props.toggleLoading}
            toggleError={this.props.toggleError}
            getLifeCoach={this.props.getLifeCoach}
            slot={setLocationSlot}
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
        <Card.Group
          className={`slots-cards-container ${!this.showBookButton() &&
            !this.showAddButton() &&
            "no-buttons-cards"}`}
        >
          {slots
            .filter(slot => new Date(slot.date) > Date.now())
            .sort((firstSlot, secondSlot) => {
              if (new Date(firstSlot.date) < new Date(secondSlot.date))
                return -1;
              else return 1;
            })
            .map(slot => (
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
                {this.showBookButton() && (
                  <Card.Content extra>
                    <Button
                      positive
                      disabled={slot.booked}
                      onClick={() =>
                        this.handleBook(slot.date, this.props.id, slot._id)
                      }
                    >
                      Book
                    </Button>
                  </Card.Content>
                )}
                {this.showAddButton() && (
                  <Card.Content extra>
                    <Button
                      disabled={slot.location || !slot.booked}
                      primary
                      onClick={() => this.handleOpenLocationModal(slot)}
                    >
                      Set Location
                    </Button>
                    <Button
                      disabled={
                        slot.confirmed || !slot.booked || !slot.location
                      }
                      color="green"
                      onClick={() => this.handleConfirm(slot, this.props.id)}
                    >
                      Confirm
                    </Button>
                    <Button
                      color="red"
                      onClick={() => this.handleDelete(slot._id, this.props.id)}
                    >
                      Delete
                    </Button>
                  </Card.Content>
                )}
              </Card>
            ))}
        </Card.Group>
      </div>
    );
  }
}

export default Slots;
