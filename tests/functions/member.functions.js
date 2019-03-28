const axios = require("axios");

const functions = {
  getMembers: async () => {
    const members = await axios.get("http://localhost:3000/api/users/members");
    return members;
  },
  createMember: async body => {
    const member = await axios({
      method: "post",
      url: "http://localhost:3000/api/users/members/create",
      data: body,
      headers: { "Content-Type": "application/json" }
    });
    return member;
  },
  updateMember: async (id, body) => {
    await axios({
      method: "put",
      url: "http://localhost:3000/api/users/members/update/" + id,
      data: body,
      headers: { "Content-Type": "application/json" }
    });
  }
};
module.exports = functions;
