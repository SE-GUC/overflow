const axios = require("axios");

const functions = {
  createReview: async body => {
    const review = await axios({
      method: "post",
      url: "http://localhost:3000/api/reviews/create",
      data: body,
      headers: { "Content-Type": "application/json" }
    });
    return review;
  },
  readMemberReviews: async memberId => {
    const reviews = await axios.get(
      "http://localhost:3000/api/reviews/readMemberReviews/" + memberId
    );
    return reviews;
  },
  readReview: async reviewId => {
    const review = await axios.get(
      "http://localhost:3000/api/reviews/readReview/" + reviewId
    );
    return review;
  },
  updateReview: async (memberId, reviewId,body) => {
    await axios({
      method: "put",
      url:
        "http://localhost:3000/api/reviews/update/" +
        memberId +
        "/" +
        reviewId +
        "/",
      data: body,
      headers: { "Content-Type": "application/json" }
    });
  },
  deleteReview: async (memberId, reviewId) => {
    const review = await axios.delete(
      "http://localhost:3000/api/reviews/delete/" +
        memberId +
        "/" +
        reviewId +
        "/"
    );
  }
};
module.exports = functions;
