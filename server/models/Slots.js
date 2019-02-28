const uuid = require("uuid");

class Slots {
  constructor(booked, date, location, member, confirmed) {
    this.id = uuid.v4();
    this.booked = booked;
    this.date = date;
    this.location = location;
    this.member = member;
    this.confirmed = confirmed;
  }
}
module.exports = Slots;
