const express = require("express");
const users = require("../../userArray");
const Vacancy = require("../../models/Vacancy");
const JobApplication = require("../../models/JobApplication");
const validator = require("../../validations/jobApplicationValidation");

const firstVacancy = new Vacancy(
  users[2],
  "description",
  "3 weeks",
  "2000 dollars",
  "cairo",
  "8 hours",
  new Date("3/31/1997"),
  new Date("5/5/2005"),
  "approved"
);

const secondVacancy = new Vacancy(
  users[2],
  "description2",
  "5 weeks",
  "3000 dollars",
  "alex",
  "8 hours",
  new Date("3/31/1997"),
  new Date("5/5/2005"),
  "hired",
  users[1]
);

const vacancies = [firstVacancy, secondVacancy];

const jobApplications = [
  new JobApplication(firstVacancy, users[1], new Date(), "text"),
  new JobApplication(secondVacancy, users[1], new Date(), "text2")
];

const router = express.Router();
router.get("/", (req, res) => {
  return res.json({ data: jobApplications });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const jobApplication = jobApplications.find(
    jobApplication => id === jobApplication.id
  );
  const jobApplicationIndex = jobApplications.indexOf(jobApplication);
  if (jobApplicationIndex < 0)
    // Bad request if not found
    return res.status(400).send({ error: "Job Application not found" });
  return res.json({ data: jobApplication });
});

router.get("/VacancyApplications/:vacancyId", (req, res) => {
  const { vacancyId } = req.params;
  const vacancy = vacancies.find(vacancy => vacancyId === vacancy.id);
  const vacancyIndex = vacancies.indexOf(vacancy);
  if (vacancyIndex < 0)
    // Bad request if not found
    return res.status(400).send({ error: "vacancy not found" });
  const vacancyApplications = jobApplications.filter(
    jobApplication => jobApplication.vacancy.id === vacancyId
  );
  return res.json({ data: vacancyApplications });
});

router.get("/MemberApplications/:memberId", (req, res) => {
  const { memberId } = req.params;
  const member = users.find(
    user => memberId === user.id && user.type === "member"
  );
  const memberIndex = users.indexOf(member);
  if (memberIndex < 0)
    // Bad request if not found
    return res.status(400).send({ error: "member not found" });
  const memberApplications = jobApplications.filter(
    jobApplication => jobApplication.member.id === memberId
  );
  return res.json({ data: memberApplications });
});

router.post("/create", (req, res) => {
  const isValidated = validator.createValidation(req.body);
  if (isValidated.error) {
    return res
      .status(400)
      .send({ error: isValidated.error.details[0].message });
  }
  const memberId = req.body.memberId;
  const member = users.find(
    user => memberId === user.id && user.type === "member"
  );
  const memberIndex = users.indexOf(member);
  if (memberIndex < 0)
    // Bad request if not found
    return res.status(400).send({ error: "member not found" });
  const vacancyId = req.body.vacancyId;
  const vacancy = vacancies.find(vacancy => vacancyId === vacancy.id);
  const vacancyIndex = vacancies.indexOf(vacancy);
  if (vacancyIndex < 0)
    // Bad request if not found
    return res.status(400).send({ error: "vacancy not found" });
  const applicationText = req.body.applicationText;
  const jobApplication = new JobApplication(
    vacancy,
    member,
    new Date(),
    applicationText
  );
  jobApplications.push(jobApplication);
  return res.json({ data: jobApplication });
});

router.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const jobApplication = jobApplications.find(
    jobApplication => id === jobApplication.id
  );
  const jobApplicationIndex = jobApplications.indexOf(jobApplication);
  const isValidated = validator.updateValidation(req.body);
  if (jobApplicationIndex < 0)
    // Bad request if not found
    return res.status(400).send({ error: "job application not found" });
  if (isValidated.error) {
    return res
      .status(400)
      .send({ error: isValidated.error.details[0].message });
  }
  const vacancy = vacancies.find(vacancy => req.body.vacancyId === vacancy.id);
  const vacancyIndex = vacancies.indexOf(vacancy);
  if (vacancyIndex < 0)
    // Bad request if not found
    return res.status(400).send({ error: "vacancy not found" });
  const member = users.find(
    user => req.body.memberId === user.id && user.type === "member"
  );
  const memberIndex = users.indexOf(member);
  if (memberIndex < 0)
    // Bad request if not found
    return res.status(400).send({ error: "member not found" });
  const { applicationText } = req.body;
  const { datePosted } = jobApplications[jobApplicationIndex];
  jobApplications[jobApplicationIndex] = {
    id,
    vacancy,
    member,
    datePosted,
    applicationText
  };
  return res.sendStatus(200);
});

router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  const jobApplication = jobApplications.find(
    jobApplication => id === jobApplication.id
  );
  const jobApplicationIndex = jobApplications.indexOf(jobApplication);
  if (jobApplicationIndex < 0)
    // Bad request if not found
    return res.status(400).send({ error: "job application not found" });
  jobApplications.splice(jobApplicationIndex, 1);
  return res.sendStatus(200);
});

module.exports = router;
