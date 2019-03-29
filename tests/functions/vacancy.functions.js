const axios = require("axios");

const functions = {
  getVacancies: async () => {
    const vacancies = await axios.get("http://localhost:3000/api/vacancies");
    return vacancies;
  },
  getPartnerVacancies: async partnerId => {
    const vacancies = await axios.get(
      "http://localhost:3000/api/vacancies/partnerVacancies/" + partnerId
    );
    return vacancies;
  },
  getVacancy: async id => {
    const vacancy = await axios.get(
      "http://localhost:3000/api/vacancies/" + id
    );
    return vacancy;
  },
  deleteVacancy: async id => {
    await axios.delete("http://localhost:3000/api/vacancies/delete/" + id);
  },
  createVacancy: async body => {
    const vacancy = await axios({
      method: "post",
      url: "http://localhost:3000/api/vacancies/create",
      data: body,
      headers: { "Content-Type": "application/json" }
    });
    return vacancy;
  },
  updateVacancy: async (id, body) => {
    await axios({
      method: "put",
      url: "http://localhost:3000/api/vacancies/update/" + id,
      data: body,
      headers: { "Content-Type": "application/json" }
    });
  }
};
module.exports = functions;
