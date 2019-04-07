import React, { Component } from "react";
import { Header, Card, Image, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";

class List extends Component {
  render() {
    const { error, vacancies } = this.props;
    return error ? (
      <Header as="h2" textAlign="center">
        Something went wrong!
      </Header>
    ) : (
      <div>
        {vacancies.map(vacancy => (
          <Link to={`/Vacancy/${vacancy._id}`}>
            <Card className="vacancy-card">
              <Card.Content>
                {vacancy.title ? (
                  <Card.Header>{vacancy.title}</Card.Header>
                ) : (
                  <Card.Header>{`${vacancy.partner.name} Vacancy`}</Card.Header>
                )}
                <Card.Meta>
                  <span>{`${vacancy.partner.name}${
                    vacancy.location ? " - " + vacancy.location : ""
                  }`}</span>
                </Card.Meta>
                <Card.Description>{vacancy.description}</Card.Description>
                {vacancy.skills
                  ? vacancy.skills.map(skill => (
                    <Label
                      color="yellow"
                      key={skill}
                      className="vacancy-label"
                    >
                      {skill}
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
