import React, { Component } from "react";
import { get } from "../services/axios";
import Container from "../components/profileContainer/Container.js";
import { Dimmer, Loader } from "semantic-ui-react";
export default class Members extends Component {
  state = {
    loading: true,
    error: false,
    partners: [],
    fieldofWorkFilters: []
  };
  componentDidMount() {
    get("users/partners")
      .then(partners => {
        this.setData(partners);
        this.setState({ partners, loading: false });
      })

      .catch(error => this.setState({ error: true, loading: false }));
  }
  setData = partners => {
    const fieldofWorkFilters = [];
    partners.forEach(partner => {
      const { fieldOfWork } = partner.userData;
      if (fieldOfWork) {
        if (!fieldofWorkFilters.includes(fieldOfWork))
          fieldofWorkFilters.push(fieldOfWork);
      }
    });
    this.setState({ fieldofWorkFilters });
  };

  render() {
    const { partners, loading, fieldofWorkFilters } = this.state;
    return (
      <div>
        <Dimmer active={loading}>
          <Loader size="massive" />
        </Dimmer>
        <Container
          loading={loading}
          pageTitle="Partners"
          pageSubHeader="Our trusted partners"
          data={partners}
          filterTitles={["Field"]}
          filterValues={[fieldofWorkFilters]}
        />
      </div>
    );
  }
}
