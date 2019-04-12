import React, { Component } from "react";
import { Header, Card, Image, Label, Transition } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Highlighter from "react-highlight-words";
import "../../styling/Vacancies.css";
import Highlightable from "../highlightable/Higlightable.js";

class List extends Component {
  render() {
    const { error, vacancies, searchKey } = this.props;
    const searchWords = searchKey.split(" ");
    return error ? (
      <Header as="h2" textAlign="center">
        Something went wrong!
      </Header>
    ) : (
      <Transition.Group duration={400}>
        {vacancies.map(vacancy => (
          <Link to={`/Vacancy/${vacancy._id}`}>
            <Card className="vacancy-card hvr-grow">
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
              {vacancy.partner.image ? (
                <Image size="tiny" src={vacancy.partner.image} />
              ) : (
                <Image size="tiny" src="https://via.placeholder.com/150" />
              )}
            </Card>
          </Link>
        ))}
      </Transition.Group>
    );
  }
}

export default List;
