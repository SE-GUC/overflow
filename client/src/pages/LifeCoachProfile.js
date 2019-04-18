import React, { Component } from "react";
import { get } from "../services/axios";
import { Loader, Dimmer, Header } from "semantic-ui-react";
import BasicInfo from "../components/lifeCoachProfile/BasicInfo";
import Slots from "../components/lifeCoachProfile/Slots";
import "../styling/lifeCoachProfile.css";
//import storageChanged from "storage-changed";
import decode from "jwt-decode";
import { connect } from "react-redux";

class LifeCoachProfile extends Component {
  state = {
    error: false,
    loading: false
  };

  componentDidMount() {
    const { state } = this.props.location;
    if (state) {
      const { lifeCoach } = state;
      this.setState({ lifeCoach });
      this.props.history.replace({
        pathname: "/LifeCoach/" + lifeCoach._id,
        state: undefined
      });
    } else {
      this.getLifeCoach();
    }
  }

  toggleLoading = () => {
    this.setState({ loading: !this.state.loading });
  };

  toggleError = () => {
    this.setState({ error: !this.state.error });
  };

  getLifeCoach = () => {
    this.setState({ loading: true });
    const id = this.props.match.params.id;
    get("users/" + id)
      .then(response => this.setState({ lifeCoach: response, loading: false }))
      .catch(error => this.setState({ error: true, loading: false }));
  };

  addSlot = slot => {
    const { lifeCoach } = this.state;
    lifeCoach.userData.monthlySlots.push(slot);
    this.setState({ lifeCoach });
    this.setLocationState(lifeCoach);
  };
  deleteSlot = id => {
    const { lifeCoach } = this.state;
    const index = lifeCoach.userData.monthlySlots.findIndex(
      slot => slot._id === id
    );
    lifeCoach.userData.monthlySlots.splice(index, 1);
    this.setState({ lifeCoach });
    this.setLocationState(lifeCoach);
  };
  confirm = id => {
    const { lifeCoach } = this.state;
    const index = lifeCoach.userData.monthlySlots.findIndex(
      slot => slot._id === id
    );
    lifeCoach.userData.monthlySlots[index].confirmed = true;
    this.setState({ lifeCoach });
    this.setLocationState(lifeCoach);
  };
  setLocationState = lifeCoach => {
    const id = this.props.match.params.id;
    this.props.history.replace({
      pathname: "/LifeCoach/" + id,
      state: { lifeCoach }
    });
  };
  setSlotLocation = slot => {
    const { lifeCoach } = this.state;
    const index = lifeCoach.userData.monthlySlots.findIndex(
      oldslot => oldslot._id === slot._id
    );
    lifeCoach.userData.monthlySlots[index] = slot;
    this.setState({ lifeCoach });
    this.setLocationState(lifeCoach);
  };
  setBooked = slot => {
    const { lifeCoach } = this.state;
    const index = lifeCoach.userData.monthlySlots.findIndex(
      oldslot => oldslot._id === slot._id
    );
    lifeCoach.userData.monthlySlots[index] = slot;
    this.setState({ lifeCoach });
    this.setLocationState(lifeCoach);
  };
  redirect = () => {
    console.log(this.state.lifeCoach, "LIFECOACH");
    this.props.history.push({
      pathname: "/EditProfile",
      user: this.state.lifeCoach
    });
  };
  render() {
    const { loading, error, lifeCoach, deleteLoading, deletedId } = this.state;
    const { userInfo } = this.props;
    const { id } = this.props.match.params;
    let myProfile = false;
    let memberId = "";
    let memberType = false;
    if (!userInfo) {
      myProfile = false;
      memberId = "";
      memberType = false;
    } else {
      if (userInfo.id === id) {
        myProfile = true;
        memberType = false;
      } else {
        if (userInfo.type === "member") {
          myProfile = false;
          memberId = userInfo.id;
          memberType = true;
        }
      }
    }

    console.log(userInfo, "USERINFO");
    if (!lifeCoach && !loading) return null;
    console.log(lifeCoach);
    return (
      <div>
        <Dimmer active={loading}>
          <Loader size="massive" />
        </Dimmer>
        {error && !loading && (
          <Header
            as="h2"
            textAlign="center"
            className="lifeCoach-error-message"
          >
            Something went wrong!
          </Header>
        )}
        {!loading && !error && (
          <div>
            <BasicInfo
              myProfile={myProfile}
              redirect={this.redirect}
              memberId={memberId}
              memberType={memberType}
              lifeCoach={lifeCoach}
              id={this.props.match.params.id}
              toggleLoading={this.toggleLoading}
              toggleError={this.toggleError}
              getLifeCoach={this.getLifeCoach}
            />
            <Slots
              setBooked={this.setBooked}
              setSlotLocation={this.setSlotLocation}
              confirm={this.confirm}
              deleteSlot={this.deleteSlot}
              deletedId={deletedId}
              myProfile={myProfile}
              memberId={memberId}
              memberType={memberType}
              lifeCoach={lifeCoach}
              addSlot={this.addSlot}
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
const mapStateToProps = state => {
  const { userInfo } = state;
  return { userInfo };
};

export default connect(mapStateToProps)(LifeCoachProfile);
