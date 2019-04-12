import React, { Component } from "react";
import {
  Image,
  Header,
  Grid,
  Segment,
  Rating,
  Button
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import decode from "jwt-decode";
import { put } from "../../services/axios";
import profile from "../../images/profile.png";

class BasicInfo extends Component {
  slotsNumber = () => {
    let counter = 0;
    this.props.lifeCoach.userData.monthlySlots.forEach(slot => {
      if (slot.confirmed) counter++;
    });
    return counter;
  };

  getRating = () => {
    if (this.props.lifeCoach.userData.ratings.length === 0)
      return "No rating yet";
    let totalRating = 0;
    this.props.lifeCoach.userData.ratings.forEach(rating => {
      totalRating += rating.rating;
    });
    let avgRating = totalRating / this.props.lifeCoach.userData.ratings.length;
    return (avgRating + "").substring(0, 3);
  };

  showEditButton = () => {
    if (!localStorage.getItem("jwtToken")) return false;
    return decode(localStorage.getItem("jwtToken")).id === this.props.id;
  };

  showRating = () => {
    if (!localStorage.getItem("jwtToken")) return false;
    return decode(localStorage.getItem("jwtToken")).type === "member";
  };

  handleRate = (e, { rating, maxRating }) => {
    let lifeCoach = this.props.lifeCoach;
    const {
      name,
      email,
      image,
      userData: { gender, dateOfBirth, hourlyRate }
    } = lifeCoach;
    let ratings = lifeCoach.userData.ratings;
    const rate = ratings.find(
      rating => rating.memberId === decode(localStorage.getItem("jwtToken")).id
    );
    const ratingIndex = ratings.indexOf(rate);
    if (ratingIndex < 0)
      ratings.push({
        memberId: decode(localStorage.getItem("jwtToken")).id,
        rating: rating
      });
    else ratings[ratingIndex].rating = rating;
    const body = {
      name,
      email,
      image,
      gender,
      dateOfBirth,
      hourlyRate,
      ratings
    };
    if (!hourlyRate) delete body.hourlyRate;
    if (!image) delete body.image;
    this.props.toggleLoading();
    put("users/lifeCoaches/update/" + this.props.id, body)
      .then(response => {
        this.props.getLifeCoach();
      })
      .catch(error => {
        this.props.toggleError();
        this.props.toggleLoading();
      });
  };

  render() {
    const {
      name,
      email,
      image,
      userData: { gender, hourlyRate, age }
    } = this.props.lifeCoach;
    return (
      <div className="lifeCoach-info-container">
        {image ? (
          <Image src={image} size="medium" avatar />
        ) : (
          <Image src={profile} size="small" avatar />
        )}
        <Header as="h1" textAlign="center">
          {name}
        </Header>
        <Segment raised>
          <Grid columns={3} divided stackable>
            <Grid.Row>
              <Grid.Column>
                <Header sub>Gender</Header>
                <span>{gender}</span>
              </Grid.Column>
              <Grid.Column>
                <Header sub>Age</Header>
                <span>{age}</span>
              </Grid.Column>
              <Grid.Column>
                <Header sub>Email</Header>
                <span>{email}</span>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Header sub>Hourly Rate</Header>
                <span>{hourlyRate}</span>
              </Grid.Column>
              <Grid.Column>
                <Header sub>Sessions So Far</Header>
                <span>{this.slotsNumber()}</span>
              </Grid.Column>
              <Grid.Column>
                <Header sub>Rating</Header>
                {this.getRating() === "No rating yet" ? (
                  <span>{this.getRating()}</span>
                ) : (
                  <Rating
                    icon="star"
                    defaultRating={this.getRating()}
                    maxRating={5}
                    disabled
                  />
                )}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        {this.showEditButton() && (
          <Link to="/">
            <Button color="green">Edit my Profile</Button>
          </Link>
        )}
        {this.showRating() && (
          <div className="lifeCoach-review-container">
            <Header as="h3">{`What do you think of ${name}?`}</Header>
            <Rating maxRating={5} onRate={this.handleRate} icon="star" />
          </div>
        )}
      </div>
    );
  }
}

export default BasicInfo;
