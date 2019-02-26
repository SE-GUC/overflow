const uuid = require("uuid");

class Vacancy {
  constructor(
    partner,
    description,
    duration,
    monthlyWage,
    location,
    dailyHours,
    startDate,
    endDate,
    state,
    acceptedMember
  ) {
    this.id = uuid.v4();
    this.partner = partner;
    this.description = description;
    this.duration = duration;
    this.monthlyWage = monthlyWage;
    this.location = location;
    this.dailyHours = dailyHours;
    this.startDate = startDate;
    this.endDate = endDate;
    this.state = state;
    this.acceptedMember = acceptedMember;
  }
}
module.exports = Vacancy;
