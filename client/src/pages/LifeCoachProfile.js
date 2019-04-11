import React, { Component } from "react";
import { get } from "../services/axios";
import { Loader, Dimmer, Header } from "semantic-ui-react";
import BasicInfo from "../components/lifeCoachProfile/BasicInfo";
import "../styling/lifeCoachProfile.css";

class LifeCoachProfile extends Component {
  state = {
    lifeCoach: {},
    error: false,
    loading: true
  };

  componentDidMount() {
    this.getLifeCoach();
  }

  toggleLoading = () => {
    this.setState({ loading: !this.state.loading });
  };

  toggleError = () => {
    this.setState({ error: !this.state.error });
  };

  getLifeCoach = () => {
    const id = this.props.match.params.id;
    get("users/" + id)
      .then(response => this.setState({ lifeCoach: response, loading: false }))
      .catch(error => this.setState({ error: true, loading: false }));
  };

  render() {
    const { loading, error, lifeCoach } = this.state;
    return (
      <div>
        <Dimmer active={loading}>
          <Loader size="massive" />
        </Dimmer>
        {error &&
          !loading && (
            <Header
              as="h2"
              textAlign="center"
              className="lifeCoach-error-message"
            >
              Something went wrong!
            </Header>
          )}
        {!loading &&
          !error && (
            <div>
              <BasicInfo
                lifeCoach={lifeCoach}
                id={this.props.match.params.id}
                toggleLoading={this.toggleLoading}
                toggleError={this.toggleError}
                getLifeCoach={this.getLifeCoach}
              />
            </div>
          )}
      </div>
    );
  }
}

export default LifeCoachProfile;
