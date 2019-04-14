import React, { Component } from "react";
import { get } from "../services/axios";
import {
  Loader,
  Dimmer,
  Header,
  Message,
  Icon,
  Grid,
  Segment,
  Divider
} from "semantic-ui-react";
import "../styling/PartnerProfile.css";
import storageChanged from "storage-changed";
import { withRouter } from "react-router-dom";
import PartnerBasicInfo from "../components/partnerProfile/PartnerBasicInfo";
import ActionSegment from "../components/partnerProfile/ActionSegment";
import VacancySegment from "../components/partnerProfile/VacancySegment";
import FeedbackSegment from "../components/partnerProfile/FeedBackSegment";
import SubmitFeedbackModal from "../components/feedbacks/SubmitFeedbackModal";
import decode from "jwt-decode";

class PartnerProfile extends Component {
  state = {
    loggedIn: false,
    loading: false,
    partner: undefined,
    error: false,
    myProfile: false,
    memberType: false,
    open: false,
    memberId: "",
    feedback: {}
  };

  componentDidMount() {
    this.setToken();
    const { state } = this.props.location;
    const { id } = this.props.match.params;
    //handling token change
    storageChanged("local", {
      eventName: "tokenChange"
    });
    window.addEventListener("tokenChange", this.setToken);
    if (state) {
      const { partner } = state;
      this.setState({ partner });
    } else {
      this.getPartner(id);
    }
  }
  componentWillUnmount() {
    window.removeEventListener("tokenChange", this.setToken);
  }
  setToken = () => {
    const tokenCheck = localStorage.getItem("jwtToken");
    if (!tokenCheck) {
      this.setState({ myProfile: false, memberType: false, memberId: "" });
      return;
    }
    const decoded = decode(tokenCheck);
    const { id } = this.props.match.params;
    if (decoded.id === id) this.setState({ myProfile: true });
    if (decoded.type === "member")
      this.setState({ memberType: true, memberId: decoded.id });
  };

  getPartner = id => {
    this.setState({ loading: true });
    const url = "users/" + id;
    get(url)
      .then(partner => {
        this.setState({ partner, loading: false, error: false });
      })
      .catch(err => {
        this.setState({ loading: false, error: true });
      });
  };
  editProfile = () => {};
  createVacancy = () => {
    const { id } = this.props.match.params;
    const { partner } = this.state;
    this.props.history.push({
      pathname: "/CreateVacancy/" + id,
      state: { partner }
    });
  };
  open = () => {
    this.setState({ open: true });
  };
  close = () => {
    this.setState({ open: false });
  };
  addFeedBack = feedback => {
    this.setState({ feedback });
  };

  render() {
    const {
      partner,
      error,
      loading,
      myProfile,
      memberType,
      vacancyCount,
      open,
      memberId,
      feedback
    } = this.state;
    const { id } = this.props.match.params;
    if (loading) {
      return (
        <Dimmer active={loading}>
          <Loader size="massive" />
        </Dimmer>
      );
    }
    return (
      <div>
        <Message className="error-message" compact error hidden={!error} icon>
          <Icon size="mini" name="times circle" />
          Something went wrong !
        </Message>
        {partner ? (
          <SubmitFeedbackModal
            addFeedBack={this.addFeedBack}
            close={this.close}
            partner={partner}
            open={open}
            memberId={memberId}
          />
        ) : null}
        <Grid centered className="partner-container" columns={3}>
          <Grid.Column only="computer" width={3}>
            <ActionSegment
              myProfile={myProfile}
              memberType={memberType}
              submitFeedback={this.open}
              editProfile={this.editProfile}
              createVacancy={this.createVacancy}
            />
          </Grid.Column>
          <Grid.Column only="computer" width={10}>
            <PartnerBasicInfo partner={partner} />
            <VacancySegment partner={partner} myProfile={myProfile} id={id} />
            <FeedbackSegment
              memberId={memberId}
              feedback={feedback}
              id={id}
              partner={partner}
              myProfile={myProfile}
            />
          </Grid.Column>
          <Grid.Column only="mobile" width={14}>
            <PartnerBasicInfo
              submitFeedback={this.open}
              editProfile={this.editProfile}
              createVacancy={this.createVacancy}
              isMobile={true}
              myProfile={myProfile}
              memberType={memberType}
              partner={partner}
            />
            <VacancySegment partner={partner} myProfile={myProfile} id={id} />
            <FeedbackSegment
              memberId={memberId}
              feedback={feedback}
              id={id}
              partner={partner}
              myProfile={myProfile}
            />
          </Grid.Column>
          <Grid.Column only="tablet" width={14}>
            <PartnerBasicInfo isTablet={true} partner={partner} />
            <ActionSegment
              myProfile={myProfile}
              memberType={memberType}
              submitFeedback={this.open}
              editProfile={this.editProfile}
              createVacancy={this.createVacancy}
            />
            <VacancySegment partner={partner} myProfile={myProfile} id={id} />
            <FeedbackSegment
              memberId={memberId}
              feedback={feedback}
              id={id}
              partner={partner}
              myProfile={myProfile}
            />
          </Grid.Column>

          <Grid.Column only="computer" width={3} />
        </Grid>
      </div>
    );
  }
}
export default withRouter(PartnerProfile);
