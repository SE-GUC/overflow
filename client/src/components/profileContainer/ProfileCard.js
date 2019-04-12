import React, { Component } from "react";
import {
  Card,
  Image,
  Header,
  Rating,
  Divider,
  Label,
  Transition
} from "semantic-ui-react";
import "../../styling/ProfileContainer.css";
import Highlightable from "../highlightable/Higlightable.js";

export default class ProfileCard extends Component {
  render() {
    const {
      name,
      email,
      userData,
      rating,
      ratingCount,
      type
    } = this.props.data;
    let { searchWords } = this.props;
    searchWords = searchWords.split(" ");
    const {
      age,
      skills,
      location,
      joinDate,
      availability,
      address,
      phone,
      fieldOfWork,
      hourlyRate,
      gender
    } = userData;
    const memberAttributes = [
      <Card.Header key={age} className="card-header" textAlign="center">
        <Highlightable
          green={true}
          textToHighlight={age + " Years"}
          searchWords={searchWords}
        />
      </Card.Header>,
      <Card.Header key={email} className="card-header" textAlign="center">
        <Highlightable
          green={true}
          textToHighlight={location}
          searchWords={searchWords}
        />
      </Card.Header>,
      <Card.Header key={email + 1} className="card-header" textAlign="center">
        <Highlightable
          textToHighlight={availability}
          searchWords={searchWords}
        />
      </Card.Header>,

      skills
        ? skills.map((skill, index) => (
            <Label
              className="skill-label"
              color="yellow"
              key={email + index + 2}
            >
              <Highlightable
                green={true}
                textToHighlight={skill}
                searchWords={searchWords}
              />
            </Label>
          ))
        : null
    ];

    const partnerAttributes = [
      <Card.Header key={email} className="card-header" textAlign="center">
        <Highlightable
          green={true}
          textToHighlight={fieldOfWork}
          searchWords={searchWords}
        />
      </Card.Header>,
      <Card.Header key={email + 1} className="card-header" textAlign="center">
        <Highlightable
          green={true}
          textToHighlight={phone ? "" + phone : phone}
          searchWords={searchWords}
        />
      </Card.Header>,
      <Card.Header key={email + 2} className="card-header" textAlign="center">
        <Highlightable textToHighlight={address} searchWords={searchWords} />
      </Card.Header>
    ];
    const lifeCoachAttributes = [
      <Card.Header key={age} className="card-header" textAlign="center">
        <Highlightable
          green={true}
          textToHighlight={age + " Years"}
          searchWords={searchWords}
        />
      </Card.Header>,
      <Card.Header key={email} className="card-header" textAlign="center">
        <Highlightable
          green={true}
          textToHighlight={hourlyRate ? hourlyRate + "/Hour" : undefined}
          searchWords={searchWords}
        />
      </Card.Header>
    ];

    return (
      <Card className="hvr-grow centered">
        <Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
        <Card.Content>
          <Card.Header className="first-header" textAlign="center">
            <Highlightable
              green={true}
              textToHighlight={name}
              searchWords={searchWords}
            />
          </Card.Header>
          {rating >= 0 ? (
            <Card.Header className="card-header" textAlign="center">
              <Rating icon="star" disabled maxRating={5} rating={rating} />
            </Card.Header>
          ) : null}
          <Card.Header
            className="card-header blue"
            size="tiny"
            textAlign="center"
          >
            <Highlightable
              green={true}
              textToHighlight={email}
              searchWords={searchWords}
            />
          </Card.Header>
          {type === "member"
            ? memberAttributes
            : type === "partner"
            ? partnerAttributes
            : lifeCoachAttributes}
        </Card.Content>
        <Card.Content extra>
          <div>
            {ratingCount >= 0 ? (
              <div>
                <span> {ratingCount} Ratings </span>
                <Divider fitted hidden />
              </div>
            ) : null}
            {joinDate ? (
              <span>Joined at {joinDate.toString().slice(0, 10)}</span>
            ) : null}
          </div>
        </Card.Content>
      </Card>
    );
  }
}
