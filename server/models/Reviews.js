const uuid = require("uuid");

class Reviews {
  constructor(partner, reviewText, rating, datePosted) {
    this.id = uuid.v4();
    this.partner = partner;
    this.reviewText = reviewText;
    this.rating = rating;
    this.datePosted = datePosted;
  }
}
module.exports = Reviews;
