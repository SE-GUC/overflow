const axios = require("axios");

const functions = {
  getAdmins: async () => {
    const admins = await axios.get("http://localhost:3000/api/users/admins");
    return admins;
  },
  createAdmin: async body => {
    const admin = await axios({
      method: "post",
      url: "http://localhost:3000/api/users/admins/create",
      data: body,
      headers: { "Content-Type": "application/json" }
    });
    return admin;
  },
  updateAdmin: async (id, body) => {
    await axios({
      method: "put",
      url: "http://localhost:3000/api/users/admins/update/" + id,
      data: body,
      headers: { "Content-Type": "application/json" }
    });
  }
};
module.exports = functions;
