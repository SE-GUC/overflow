import React, { Component } from "react";
import {
  Header,
  Card,
  Image,
  Label,
  Icon,
  Divider,
  Popup
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import Highlighter from "react-highlight-words";
import "../../styling/Vacancies.css";
import Highlightable from "../highlightable/Higlightable.js";
import { withRouter } from "react-router-dom";

class List extends Component {
  redirect = () => {
    const { fromPartner, vacancy } = this.props;
    if (fromPartner) return;
    this.props.history.push({
      pathname: "/Vacancy/" + vacancy._id,
      state: { vacancy }
    });
  };
  redirectComp = () => {
    const { fromPartner, vacancy } = this.props;
    if (!fromPartner) return;
    this.props.history.push({
      pathname: "/Vacancy/" + vacancy._id,
      state: { vacancy }
    });
  };
  delete = () => {
    const { _id } = this.props.vacancy;
    this.props.del(_id);
  };
  edit = () => {
    const { edit, vacancy } = this.props;
    edit(vacancy);
  };
  viewJobApplications = () => {
    this.props.viewJobApplications(this.props.vacancy._id, this.props.vacancy);
  };

  render() {
    const { error, vacancy, searchKey, fromPartner, deletedId } = this.props;
    const searchWords = searchKey.split(" ");
    return error ? (
      <Header as="h2" textAlign="center">
        Something went wrong!
      </Header>
    ) : (
      <div>
        <Card onClick={this.redirect} className="vacancy-card hvr-grow">
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
                  <Label color="yellow" key={skill} className="vacancy-label">
                    <Highlightable
                      searchWords={searchWords}
                      textToHighlight={skill}
                    />
                  </Label>
                ))
              : []}
            {fromPartner ? (
              <div>
                <Divider />
                <Icon
                  onClick={this.edit}
                  size="big"
                  name="pencil alternate"
                  color="yellow"
                />
                <Icon
                  onClick={this.viewJobApplications}
                  size="big"
                  name="wpforms"
                  color="blue"
                />
                <Icon
                  loading={vacancy._id == deletedId}
                  onClick={this.delete}
                  size="big"
                  name="times circle"
                  color="red"
                />
                <Icon
                  onClick={this.redirectComp}
                  size="big"
                  name="expand"
                  color="green"
                />
              </div>
            ) : null}
            {vacancy.state === "taken" ? (
              <Popup
                on="hover"
                position="top right"
                content={"Taken"}
                trigger={
                  <Label corner size="mini" icon="check" color="green" />
                }
              />
            ) : null}
          </Card.Content>

          {vacancy.partner.image ? (
            <Image
              onClick={this.redirectComp}
              size="tiny"
              src={vacancy.partner.image}
            />
          ) : (
            <Image
              onClick={this.redirectComp}
              size="tiny"
              src="https://via.placeholder.com/150"
            />
          )}
        </Card>
      </div>
    );
  }
}

export default withRouter(List);
