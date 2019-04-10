import React, { Component } from "react";
import { Header, Card, Image, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Highlighter from "react-highlight-words";
import "../../styling/Vacancies.css";
class List extends Component {
  render() {
    const { error, vacancies, searchKey } = this.props;
    const searchWords = searchKey.split(" ");
    return error ? (
      <Header as="h2" textAlign="center">
        Something went wrong!
      </Header>
    ) : (
      <div>
        {vacancies.map(vacancy => (
          <Link to={`/Vacancy/${vacancy._id}`}>
            <Card className="vacancy-card hvr-grow">
              <Card.Content>
                {vacancy.title ? (
                  <Card.Header>
                    <Highlighter
                      highlightClassName="highlight-font"
                      searchWords={searchWords}
                      autoEscape={true}
                      textToHighlight={vacancy.title}
                    />
                  </Card.Header>
                ) : (
                  <Card.Header>
                    <Highlighter
                      highlightClassName="highlight-font"
                      searchWords={searchWords}
                      autoEscape={true}
                      textToHighlight={`${vacancy.partner.name} Vacancy`}
                    />
                  </Card.Header>
                )}

                <span className="highlight-meta">
                  <Highlighter
                    highlightClassName="highlight-font"
                    searchWords={searchWords}
                    autoEscape={true}
                    textToHighlight={`${vacancy.partner.name}${
                      vacancy.location ? " - " + vacancy.location : ""
                    }`}
                  />
                </span>

                <Card.Description>
                  <Highlighter
                    highlightClassName="highlight-font"
                    searchWords={searchWords}
                    autoEscape={true}
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
                        <Highlighter
                          highlightClassName="highlight-font"
                          searchWords={searchWords}
                          autoEscape={true}
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
      </div>
    );
  }
}

export default List;
