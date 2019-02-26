const uuid = require('uuid');

export default class Partner {
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
