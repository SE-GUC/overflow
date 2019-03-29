const axios = require("axios");

const functions = {
  getUsers: async () => {
    const users = await axios.get("http://localhost:3000/api/users/");
    return users;
  },
  getUser: async id => {
    const user = await axios.get("http://localhost:3000/api/users/" + id);
    return user;
  },
  deleteUser: async id => {
    await axios.delete("http://localhost:3000/api/users/delete/" + id);
  },
  updatePassword: async (id, oldPassword, newPassword) => {
    await axios.put("http://localhost:3000/api/users/updatePassword/" + id, {
      oldPassword,
      newPassword
    });
  }
};
module.exports = functions;
