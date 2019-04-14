import React, { Component } from "react";
import { Segment, Header, Icon } from "semantic-ui-react";
import "../../styling/PartnerProfile.css";

export default class ActionSegment extends Component {
  render() {
    const {
      editProfile,
      createVacancy,
      submitFeedback,
      myProfile,
      memberType
    } = this.props;
    if (!myProfile && !memberType) return null;
    return (
      <Segment padded id="action-segment">
        {myProfile ? (
          <div>
            <Header size="small" onClick={editProfile} className="click">
              Edit Profile
              <Icon id="action-icon" color="yellow" name="edit" />
            </Header>
            <Header size="small" onClick={createVacancy} className="click">
              Add Vacancy
              <Icon id="action-icon" color="green" name="plus" />
            </Header>
          </div>
        ) : null}
        {memberType ? (
          <Header size="small" onClick={submitFeedback} className="click">
            Feedback
            <Icon id="action-icon" color="teal" name="reply" />
          </Header>
        ) : null}
      </Segment>
    );
  }
}
