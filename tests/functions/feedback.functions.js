const axios = require("axios");

const functions = {
  getPartnerFeedbacks: async partnerId => {
    const feedbacks = await axios.get(
      "http://localhost:3000/api/feedback/readPartnerFeedbacks/" + partnerId
    );
    return feedbacks;
  },
  getFeedback: async id => {
    const feedback = await axios.get(
      "http://localhost:3000/api/feedback/readFeedback/" + id
    );
    return feedback;
  },
  deleteFeedback: async (feedbackId, partnerId) => {
    await axios.delete(
      "http://localhost:3000/api/feedback/delete/" +
        partnerId +
        "/" +
        feedbackId
    );
  },
  createFeedback: async body => {
    const feedback = await axios({
      method: "post",
      url: "http://localhost:3000/api/feedback/create",
      data: body,
      headers: { "Content-Type": "application/json" }
    });
    return feedback;
  },
  updateFeedback: async (feedbackId, partnerId, body) => {
    await axios({
      method: "put",
      url:
        "http://localhost:3000/api/feedback/update/" +
        partnerId +
        "/" +
        feedbackId,
      data: body,
      headers: { "Content-Type": "application/json" }
    });
  }
};
module.exports = functions;
