import React, { Component } from "react";
import * as axios from "../../services/axios.js";
import decode from "jwt-decode";
import {
  Modal,
  Button,
  Header,
  Rating,
  Grid,
  Dimmer,
  Loader,
  Form,
  TextArea
} from "semantic-ui-react";
import "../../styling/applyModal.css";
class SubmitFeedbackModal extends Component {
  constructor() {
    super();
    this.state = {
      feedbackText: "",
      memberId: "",
      partner: null,
      loading: false
    };
  }
  handleChange = (e, { value }) => {
    if (value != "") {
      this.setState({ disabled: false, feedbackText: value });
    } else {
      this.setState({ disabled: true, feedbackText: value });
    }
  };
  getCurrentMember = () => {
    // let decoded = decode(localStorage.getItem("jwtToken"));
    // if (decoded.type) {
    //   if (decoded.type === "partner") {
    //     this.setState({ partnerId: decoded.id });
    //     return decoded.id;
    //   }
    // }
    return "5ca7ad908a73485200cf4f0a";
  };

  handleClick = () => {
    let url = "feedback/create";
    this.setState({ loading: true });
    const { partner } = this.props;
    const memberId = this.props.memberId;
    const { feedbackText } = this.state;
    let body = {
      feedbackText: feedbackText,
      memberId: memberId,
      partnerId: partner._id
    };
    axios.post(url, body).then(data => {
      this.props.addFeedBack(data.data);
      this.setState({ loading: false });
      this.props.close();
    });
  };
  componentWillReceiveProps(newProps) {
    this.setState({ hidden: newProps.hidden });
  }

  /*componentDidMount() {
    const id = "5ca9f44f4af55e8cbcdd9a52";
    const url = "users/" + id;
    axios
      .get(url)
      .then(partner => {
        this.setState({ partner: partner });
      })

      .catch(error => {
        console.log(error);
      });
    this.setState({ hidden: this.props.hidden });
  }
  handleClose = () => {
    this.setState({ hidden: true });
  };*/
  render() {
    const { memberId, partner, open } = this.props;
    let { loading } = this.state;
    const name = partner ? partner.name : null;
    const placeholder = "Give us your feedback about " + name;
    return (
      <Modal closeIcon open={open} onClose={this.props.close}>
        <Modal.Header className="modal-header" inverted>
          Submit a Feedback
        </Modal.Header>
        <Modal.Content>
          <Grid padded columns={2} divided>
            <Grid.Row>
              <Grid.Column>
                <Header as="h3"> Partner Details</Header>
                <Header as="h5">
                  Name: <span>{partner ? partner.name : "N/a"}</span>
                </Header>
                <Header as="h5">
                  Field Of Work:{" "}
                  <span>{partner ? partner.userData.fieldOfWork : "N/a"}</span>
                </Header>
                <Header as="h5">
                  Phone: <span>{partner ? partner.userData.phone : "N/a"}</span>
                </Header>
                <Header as="h5">
                  Projects:{" "}
                  <span>{partner ? partner.userData.projects : "N/a"}</span>
                </Header>
              </Grid.Column>
              <Grid.Column stretched>
                <Header as="h3">Feedback Text</Header>
                <Form>
                  <Form.Field required>
                    <TextArea
                      rows={8}
                      onChange={this.handleChange}
                      placeholder={placeholder}
                    />
                  </Form.Field>
                </Form>
                <div style={{ marginTop: "1em" }} id="sendAppButton">
                  <Button
                    loading={loading}
                    disabled={this.state.disabled}
                    onClick={this.handleClick}
                    color="yellow"
                  >
                    Send Feedback
                  </Button>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal.Content>
      </Modal>
    );
  }
}
export default SubmitFeedbackModal;
