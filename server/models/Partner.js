const uuid = require('uuid');

class Partner {
  constructor(
    name,
    address,
    email,
    fax,
    phone,
    partners,
    members,
    fieldOfWork,
    projects,
    feedback,
  ) {
    this.id = uuid.v4();
    this.name = name;
    this.address = address;
    this.email = email;
    this.fax = fax;
    this.phone = phone;
    this.partners = partners;
    this.members = members;
    this.fieldOfWork = fieldOfWork;
    this.projects = projects;
    this.feedback = feedback;
  }
}
module.exports = Partner;
