const axios = require("axios");

const functions = {
  getPartners: async () => {
    const partners = await axios.get(
      "http://localhost:3000/api/users/partners"
    );
    return partners;
  },
  createPartner: async body => {
    const partner = await axios({
      method: "post",
      url: "http://localhost:3000/api/users/partners/create",
      data: body,
      headers: { "Content-Type": "application/json" }
    });
    return partner;
  },
  updatePartner: async (id, body) => {
    await axios({
      method: "put",
      url: "http://localhost:3000/api/users/partners/update/" + id,
      data: body,
      headers: { "Content-Type": "application/json" }
    });
  }
};
module.exports = functions;
