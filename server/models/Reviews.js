const uuid = require("uuid");

class Reviews {
  constructor(partner, review, rating, datePosted) {
    this.id = uuid.v4();
    this.partner = partner;
    this.review = review;
    this.rating = rating;
    this.datePosted = datePosted;
  }
}
module.exports = Reviews;
