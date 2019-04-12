import React, { Component } from "react";
import { get } from "../services/axios";
import Container from "../components/profileContainer/Container.js";
import {
  Dimmer,
  Loader,
  Grid,
  Segment,
  Header,
  Icon,
  Image
} from "semantic-ui-react";
export default class Members extends Component {
  state = {
    loading: true,
    error: false,
    lifeCoaches: [],
    hourlyRates: []
  };
  componentDidMount() {
    get("users/lifeCoaches")
      .then(lifeCoaches => {
        this.setData(lifeCoaches);
        this.setState({ lifeCoaches, loading: false });
      })

      .catch(error => this.setState({ error: true, loading: false }));
  }
  setData = partners => {
    const hourlyRates = [];
    partners.forEach(partner => {
      const { ratings, hourlyRate } = partner.userData;
      if (hourlyRate) {
        if (!hourlyRates.includes(hourlyRate)) hourlyRates.push(hourlyRate);
      }
      if (!ratings) {
        partner.rating = 0;
        partner.ratingCount = 0;
        return;
      }
      const ratingSum = ratings.reduce((acc, rating) => {
        if (!rating.rating) return acc;
        return rating.rating + acc;
      }, 0);
      console.log(ratingSum, "RATING");
      const avg = ratingSum === 0 ? 0 : ratingSum / ratings.length;
      partner.rating = avg;
      partner.ratingCount = ratings.length;
    });

    this.setState({ hourlyRates });
  };

  render() {
    const { lifeCoaches, partners, loading, hourlyRates } = this.state;
    return (
      <div>
        <Dimmer active={loading}>
          <Loader size="massive" />
        </Dimmer>
        <Container
          loading={loading}
          pageTitle="Life Coaches"
          pageSubHeader="Your guide to a better life"
          data={lifeCoaches}
          filterTitles={["Gender", "Rate"]}
          filterValues={[["Female", "Male"], hourlyRates]}
        />
      </div>
    );
  }
}
