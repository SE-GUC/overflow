class Partner {
  constructor(
    address,
    fax,
    phone,
    partners,
    members,
    fieldOfWork,
    projects,
    feedback
  ) {
    this.address = address;
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
