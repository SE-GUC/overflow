const uuid = require("uuid");

class JobApplication {
  constructor(partner, vacancy, member, datePosted, text) {
    this.id = uuid.v4();
    this.partner = partner;
    this.vacancy = vacancy;
    this.member = member;
    this.datePosted = datePosted;
    this.text = text;
  }
}
module.exports = JobApplication;
