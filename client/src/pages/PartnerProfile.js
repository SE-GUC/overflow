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
//import storageChanged from "storage-changed";
import { withRouter } from "react-router-dom";
import PartnerBasicInfo from "../components/partnerProfile/PartnerBasicInfo";
import ActionSegment from "../components/partnerProfile/ActionSegment";
import VacancySegment from "../components/partnerProfile/VacancySegment";
import FeedbackSegment from "../components/partnerProfile/FeedBackSegment";
import SubmitFeedbackModal from "../components/feedbacks/SubmitFeedbackModal";
import decode from "jwt-decode";
import { connect } from "react-redux";

class PartnerProfile extends Component {
  state = {
    loggedIn: false,
    loading: false,
    partner: undefined,
    error: false,
    open: false,
    feedback: {}
  };

  componentDidMount() {
    const { state } = this.props.location;
    const { id } = this.props.match.params;
    if (state) {
      const { partner } = state;
      this.setState({ partner });
      this.props.history.replace({
        pathname: "/Partner/" + id,
        state: undefined
      });
    } else {
      this.getPartner(id);
    }
  }

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
  editProfile = () => {
    this.props.history.push({
      pathname: "/EditProfile",
      user: this.state.partner
    });
  };
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
      vacancyCount,
      open,
      feedback
    } = this.state;
    const { id } = this.props.match.params;
    const { userInfo } = this.props;
    let myProfile = false;
    let memberId = "";
    let memberType = false;
    let adminType = false;
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
        } else {
          if (userInfo.type === "admin") adminType = true;
        }
      }
    }
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
            <VacancySegment
              admin={adminType}
              partner={partner}
              myProfile={myProfile}
              id={id}
            />
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
              admin={adminType}
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
            <VacancySegment
              admin={adminType}
              partner={partner}
              myProfile={myProfile}
              id={id}
            />
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
const mapStateToProps = state => {
  const { userInfo } = state;
  return { userInfo };
};

export default withRouter(connect(mapStateToProps)(PartnerProfile));
