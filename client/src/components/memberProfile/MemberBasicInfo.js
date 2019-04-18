import React, { Component } from "react";
import "../../styling/PartnerProfile.css";
import {
  Image,
  Header,
  Grid,
  Segment,
  Button,
  List,
  Icon,
  Rating,
  Popup
} from "semantic-ui-react";
import profile from "../../images/profile.png";
import MemberActions from "./MemberActions";

export default class MemberBasicInfo extends Component {
  render() {
    const {
      member,
      isMobile,
      myProfile,
      partnerType,
      submitReview,
      editProfile
    } = this.props;
    if (!member) return null;
    const { name, email, rating, ratingCount } = member;
    const {
      age,
      availability,
      gender,
      interests,
      joinDate,
      location,
      skills
    } = member.userData;
    return (
      <div className="partner-info-container">
        <Image src={profile} size="small" avatar />
        <Header as="h1" textAlign="center">
          {name}
          <Header.Subheader>{`Joined since ${joinDate
            .toString()
            .slice(0, 10)}`}</Header.Subheader>
        </Header>
        <Grid id="mobile-padding" columns={4} divided stackable as={Segment}>
          <Grid.Row>
            <Grid.Column>
              <Header sub>Email </Header>
              <span>{email}</span>
            </Grid.Column>
            <Grid.Column>
              <Header sub>Age</Header>
              <span>{age}</span>
            </Grid.Column>
            <Grid.Column>
              <Header sub>Location</Header>
              <span>{location ? location : "N/A"}</span>
            </Grid.Column>
            <Grid.Column>
              <Header sub> Gender </Header>
              {gender === "male" ? (
                <Icon size="big" name="mars" color="blue" />
              ) : (
                <Icon size="big" name="woman" color="pink" />
              )}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Header sub>Availability</Header>
              <span>
                {availability
                  ? availability.includes("art")
                    ? `Part-Time`
                    : `Full-Time`
                  : "Part-Time"}
              </span>
            </Grid.Column>
            <Grid.Column>
              <Header sub>Skills </Header>
              <List bulleted>
                {!skills
                  ? "N/A"
                  : skills.map(skill => (
                      <List.Item key={skill}>{skill}</List.Item>
                    ))}
              </List>
            </Grid.Column>
            <Grid.Column>
              <Header sub>interests</Header>
              <List bulleted>
                {!interests
                  ? "N/A"
                  : interests.map(interest => (
                      <List.Item key={interest}>{interest}</List.Item>
                    ))}
              </List>
            </Grid.Column>
            <Grid.Column>
              <Header sub>Rating</Header>
              {ratingCount === 0 ? (
                <span>No Rating Yet</span>
              ) : (
                <Popup
                  trigger={
                    <Rating
                      icon="star"
                      defaultRating={rating}
                      maxRating={5}
                      disabled
                    />
                  }
                  on="hover"
                  position="bottom center"
                  content={`${ratingCount} Ratings`}
                />
              )}
            </Grid.Column>
            {isMobile ? (
              <Grid.Column>
                <MemberActions
                  openJobApps={this.props.openJobApps}
                  myProfile={myProfile}
                  partnerType={partnerType}
                  submitReview={submitReview}
                  editProfile={editProfile}
                />
              </Grid.Column>
            ) : null}
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
