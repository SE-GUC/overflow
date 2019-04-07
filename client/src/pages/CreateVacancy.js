import React, { Component } from "react";
import { Responsive } from "semantic-ui-react";
import VacancyForm from "../components/vacancies/VacancyForm";
class CreateVacancy extends Component {
  render() {
    return (
      <div>
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <VacancyForm
            partnerId={this.props.match.params.partnerId}
            isMobile={false}
          />
        </Responsive>
        <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
          <VacancyForm
            partnerId={this.props.match.params.partnerId}
            isMobile={true}
          />
        </Responsive>
      </div>
    );
  }
}
export default CreateVacancy;
