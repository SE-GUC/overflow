const uuid = require("uuid");
class Feedback {
  constructor(member, feedbackText, datePosted) {
    this.id = uuid.v4();
    this.member = member;
    this.datePosted = datePosted;
    this.feedbackText = feedbackText;
  }
}
module.exports = Feedback;
