const axios = require("axios");

const functions = {
  getJobApplications: async () => {
    const jobApplications = await axios.get(
      "http://localhost:3000/api/jobApplications"
    );
    return jobApplications;
  },
  getVacancyApplications: async vacancyId => {
    const jobApplications = await axios.get(
      "http://localhost:3000/api/jobApplications/VacancyApplications/" +
        vacancyId
    );
    return jobApplications;
  },
  getMemberApplications: async memberId => {
    const jobApplications = await axios.get(
      "http://localhost:3000/api/jobApplications/MemberApplications/" + memberId
    );
    return jobApplications;
  },
  getJobApplication: async id => {
    const jobApplication = await axios.get(
      "http://localhost:3000/api/jobApplications/" + id
    );
    return jobApplication;
  },
  deleteJobApplication: async id => {
    await axios.delete(
      "http://localhost:3000/api/jobApplications/delete/" + id
    );
  },
  createJobApplication: async body => {
    const jobApplication = await axios({
      method: "post",
      url: "http://localhost:3000/api/jobApplications/create",
      data: body,
      headers: { "Content-Type": "application/json" }
    });
    return jobApplication;
  },
  updateJobApplication: async (id, body) => {
    await axios({
      method: "put",
      url: "http://localhost:3000/api/jobApplications/update/" + id,
      data: body,
      headers: { "Content-Type": "application/json" }
    });
  }
};
module.exports = functions;
