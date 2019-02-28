const uuid = require("uuid");

class JobApplication {
  constructor(partner, vacancy, member, datePosted, applicationText) {
    this.id = uuid.v4();
    this.partner = partner;
    this.vacancy = vacancy;
    this.member = member;
    this.datePosted = datePosted;
    this.applicationText = applicationText;
  }
}
module.exports = JobApplication;
