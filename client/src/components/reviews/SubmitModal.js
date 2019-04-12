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
class SubmitModal extends Component {
  constructor() {
    super();
    this.state = {
      reviewText: "",
      rating: 0,
      partnerId: "",
      member: null
    };
  }
  handleChange = (e, { value }) => {
    if (value != "") {
      this.setState({ disabled: false, reviewText: value });
    } else {
      this.setState({ disabled: true, reviewText: value });
    }
  };
  getCurrentPartner = () => {
    // let decoded = decode(localStorage.getItem("jwtToken"));
    // if (decoded.type) {
    //   if (decoded.type === "partner") {
    //     this.setState({ partnerId: decoded.id });
    //     return decoded.id;
    //   }
    // }
    return '5ca9f44f4af55e8cbcdd9a52'
  };
  handleRate = (e, { rating, maxRating }) => {
    this.setState({ rating });
  };
  handleClick = () => {
    let url = "reviews/create";
    this.setState({loading:true})
    const { member } = this.state;
    const partnerID = this.getCurrentPartner();
    const { reviewText, rating } = this.state;
    let body = {
      reviewText: reviewText,
      rating: rating +"",
      partnerID: partnerID,
      memberID: member._id
    };
    axios.post(url, body).then(data => {
      console.log(data, "Success");

      // this.props.handleHidden();
      // this.props.applied();
      this.setState({ hidden: true,loading:false });
    });
  };
  componentWillReceiveProps(newProps) {
    this.setState({ hidden: newProps.hidden });
  }

  componentDidMount() {
    const id = "5ca7ad908a73485200cf4f0a";
    const url = "users/" + id;
    axios
      .get(url)
      .then( member => {
        this.setState({ member: member });
      })
      .catch(error => {
        console.log(error);
      });
    this.setState({ hidden: this.props.hidden });
  }
  handleClose=()=>{
    this.setState({ hidden: true });
  }
  render() {
    let { memberId } = this.props;
    let { member,loading } = this.state;
    const name = member ? member.name : null;
    const { hidden } = this.state;
    const placeholder = "What do you think about " + { name };
    return !member || loading? (
      <div>
        <Dimmer active>
          <Loader size="huge" inverted />
        </Dimmer>
      </div>
    ) : (
      <Modal open={!hidden} onClose = {this.handleClose}>
        <Modal.Header>Submit a Review</Modal.Header>
        <Modal.Content>
          <Grid padded columns={2} divided>
            <Grid.Row>
              <Grid.Column>
                <Header as="h3"> Member Details</Header>
                <Header as="h5">
                  Name: <span>{member ? member.name : "N/a"}</span>
                </Header>
                <Header as="h5">
                  Skills: <span>{member ? member.userData.skills : "N/a"}</span>
                </Header>
                <Header as="h5">
                  Availability:{" "}
                  <span>{member ? member.userData.availability : "N/a"}</span>
                </Header>
                <Header as="h5">
                  Location:{" "}
                  <span>{member ? member.userData.location : "N/a"}</span>
                </Header>
              </Grid.Column>
              <Grid.Column stretched>
                <Header as="h3">Review Text</Header>
                <Form>
                  <Form.Field required>
                    <TextArea
                      rows={8}
                      onChange={this.handleChange}
                      placeholder={placeholder}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Header as="h3">Rating</Header>
                    <Rating size="large" maxRating={5} onRate={this.handleRate} />
                  </Form.Field>
                </Form>

                <div id="sendAppButton">
                  <Button
                    disabled={this.state.disabled}
                    onClick={this.handleClick}
                    color="yellow"
                  >
                    Send Review
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
export default SubmitModal;
