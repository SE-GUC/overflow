import React, { Component } from "react";
import * as axios from "../../services/axios.js";
import decode from "jwt-decode";
import { Modal, Button, Header, Grid, Form, TextArea } from "semantic-ui-react";
import '../../styling/applyModal.css'
class ApplyModal extends Component {
  constructor() {
    super();
    this.state = {
      applicationText: "",
      disabled: true
    };
  }
  handleChange = (e, { value }) => {
      if(value!=''){
          this.setState({disabled:false,applicationText:value})
      }else{
          this.setState({disabled:true,applicationText:value})
      }
  };
  handleClick = ()=>{
    let url = 'jobApplications/create'
    const{vacancy,memberId} = this.props;
    const {applicationText }=this.state;
    let body = {
        vacancyId:vacancy._id,
        memberId:memberId,
        applicationText:applicationText,
    }
    axios.post(url,body).then((data)=>{
        console.log(data,"Success");

        this.props.handleHidden();
        this.props.applied();
        this.setState({hidden:true})
    })
  }
  componentWillReceiveProps(newProps){
      this.setState({hidden:newProps.hidden})
  }
  componentDidMount(){
      this.setState({hidden:this.props.hidden});
  }
  render() {
    let {  memberId, vacancy } = this.props;
    const {hidden} = this.state;
    console.log(hidden, memberId, vacancy, "Inside Modal");
    return (
      <Modal open={!hidden}>
        <Modal.Header>Confirm Job Application</Modal.Header>
        <Modal.Content>
          <Grid padded columns={2} divided>
            <Grid.Row>
              <Grid.Column>
                <Header as="h3"> Vacancy Details</Header>
                <Header as="h5">
                  Title: <span>{vacancy.title}</span>
                </Header>
                <Header as="h5">
                  Employer: <span>{vacancy.partner.name}</span>
                </Header>
                <Header as="h5">
                  Availability: <span>{vacancy.availability}</span>
                </Header>
                <Header as="h5">
                  Location: <span>{vacancy.location}</span>
                </Header>
                <Header as="h5">
                  Start Date: <span>{vacancy.startDate}</span>
                </Header>
                <Header as="h5">
                  Duration: <span>{vacancy.duration}</span>
                </Header>
              </Grid.Column>
              <Grid.Column  stretched >
               
                  <Header as="h3">Application Text</Header>
                  <Form>
                    <Form.Field required>
                      <TextArea
                        rows={8}
                        onChange={this.handleChange}
                        placeholder="Why would we hire you ?"
                      />
                    </Form.Field>
                  </Form>
                
                <div id="sendAppButton">
                  <Button disabled={this.state.disabled} onClick={this.handleClick} color="yellow">Send Application</Button>
               </div>
              
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal.Content>
      </Modal>
    );
  }
}
export default ApplyModal;
