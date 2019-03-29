const axios = require("axios");

const functions = {
  getLifeCoaches: async () => {
    const lifeCoaches = await axios.get("http://localhost:3000/api/users/lifeCoaches");
    return lifeCoaches;
  },
  createLifeCoaches: async body => {
    const lifeCoaches = await axios({
      method: "post",
      url: "http://localhost:3000/api/users/lifeCoaches/create",
      data: body,
      headers: { "Content-Type": "application/json" }
    });
    return lifeCoaches;
  },
  updateLifeCoach: async (id, body) => {
    await axios({
      method: "put",
      url: "http://localhost:3000/api/users/lifeCoaches/update/" + id,
      data: body,
      headers: { "Content-Type": "application/json" }
    });
  }
};
module.exports = functions;