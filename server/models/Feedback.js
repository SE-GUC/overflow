const uuid = require("uuid");
class Feedback {
  constructor(member, feedback, datePosted) {
    this.id = uuid.v4();
    this.member = member;
    this.datePosted = datePosted;
    this.feedback = feedback;
  }
}
module.exports = Feedback;
