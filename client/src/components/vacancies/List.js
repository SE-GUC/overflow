import React, { Component } from "react";
import {
  Header,
  Card,
  Image,
  Label,
  Transition,
  Confirm,
  Popup,
  Modal,
  Button
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import Highlighter from "react-highlight-words";
import "../../styling/Vacancies.css";
import Highlightable from "../highlightable/Higlightable.js";
import storageChanged from "storage-changed";
import decode from "jwt-decode";
class List extends Component {
  state = { approveLoading: false, openConfirm: false, deletedId: "" };
  closeConfirm = () => {
    this.setState({ openConfirm: false });
  };
  openConfirm = (e, value) => {
    this.setState({ openConfirm: true, deletedId: value });
  };
  approve = (e, value, pid) => {
    this.setState({ approveLoading: true });
    // const { _id } = this.props.data;
    console.log(value, "ID", pid, "pid");
    this.props.approve(value, pid);
  };
  delete = () => {
    // const { _id } = this.props.data;
    this.closeConfirm();
    this.props.del(this.state.deletedId);
  };
  componentWillReceiveProps(newProps) {
    this.setState({ approveLoading: newProps.approveLoading });
  }
  componentDidMount() {
    this.setState({ approveLoading: this.props.approveLoading });
  }
  handleClick = (e, id) => {
    if (e.target.name === "deleteButton" || e.target.name == "approveButton") {
      e.preventDefault();
      e.stopPropagation();
    } else {
      this.props.redirect(id);
    }
  };
  render() {
    const { error, vacancies, searchKey, adminType, pendingCount } = this.props;
    const { approveLoading, openConfirm } = this.state;
    const searchWords = searchKey.split(" ");
    console.log(openConfirm, "OPENCONFIRM");
    return error ? (
      <Header as="h2" textAlign="center">
        Something went wrong!
      </Header>
    ) : (
      [
        <Transition.Group duration={400}>
          {vacancies.map(vacancy => (
            // <Link to={`/Vacancy/${vacancy._id}`}>
            <div>
              <Card
                onClick={e => this.handleClick(e, vacancy._id)}
                className="vacancy-card hvr-grow"
              >
                <Card.Content>
                  {vacancy.title ? (
                    <Card.Header>
                      <Highlightable
                        textToHighlight={vacancy.title}
                        searchWords={searchWords}
                      />
                    </Card.Header>
                  ) : (
                    <Card.Header>
                      <Highlightable
                        searchWords={searchWords}
                        textToHighlight={`${vacancy.partner.name} Vacancy`}
                      />
                    </Card.Header>
                  )}

                  <span className="highlight-meta">
                    <Highlightable
                      searchWords={searchWords}
                      textToHighlight={`${vacancy.partner.name}${
                        vacancy.location ? " - " + vacancy.location : ""
                      }`}
                    />
                  </span>

                  <Card.Description>
                    <Highlightable
                      searchWords={searchWords}
                      textToHighlight={vacancy.description}
                    />
                  </Card.Description>
                  {vacancy.skills
                    ? vacancy.skills.map(skill => (
                        <Label
                          color="yellow"
                          key={skill}
                          className="vacancy-label"
                        >
                          <Highlightable
                            searchWords={searchWords}
                            textToHighlight={skill}
                          />
                        </Label>
                      ))
                    : []}
                </Card.Content>
                <Card.Content extra>
                  {vacancy.state === "unapproved" ||
                  vacancy.state === "Not taken" ? (
                    <div>
                      <Popup
                        on="hover"
                        position="top right"
                        content="Pending approval"
                        trigger={
                          <Label corner icon="clock outline" color="yellow" />
                        }
                      />
                      <Card.Header>
                        <Button
                          name="approveButton"
                          style={{ marginBottom: "0.6em" }}
                          size='small'
                          loading={approveLoading}
                          onClick={e =>
                            this.approve(e, vacancy._id, vacancy.partner._id)
                          }
                          basic
                          color="green"
                        >
                          Approve
                        </Button>
                      </Card.Header>
                    </div>
                  ) : null}
                  {adminType ? (
                    <Card.Header>
                      <Button
                        name="deleteButton"
                        onClick={e => this.openConfirm(e, vacancy._id)}
                        color="red"
                      >
                        Delete
                      </Button>
                    </Card.Header>
                  ) : null}
                </Card.Content>

                {vacancy.partner.image ? (
                  <Image size="tiny" src={vacancy.partner.image} />
                ) : (
                  <Image size="tiny" src="https://via.placeholder.com/150" />
                )}
              </Card>
            </div>
            // </Link>
          ))}
        </Transition.Group>,
        <Confirm
          open={openConfirm}
          onCancel={this.closeConfirm}
          onConfirm={this.delete}
        />
      ]
    );
  }
}

export default List;
