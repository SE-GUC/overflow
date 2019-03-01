const express = require("express");
const users = require("../../userArray");
const Vacancy = require("../../models/Vacancy");
const Partner = require("../../models/Partner");
const Member = require("../../models/Member");
const validator = require("../../validations/vacancyValidation");

const vacancies = [
  new Vacancy(
    users[2],
    "description",
    "3 weeks",
    "2000 dollars",
    "cairo",
    "8 hours",
    new Date("3/31/1997"),
    new Date("5/5/2005"),
    "approved"
  ),
  new Vacancy(
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
  )
];

const router = express.Router();

router.get("/", (req, res) => {
  return res.json({ data: vacancies });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const vacancy = vacancies.find(vacancy => id === vacancy.id);
  const vacancyIndex = vacancies.indexOf(vacancy);
  if (vacancyIndex < 0)
    // Bad request if not found
    return res.status(400).send({ error: "vacancy not found" });
  return res.json({ data: vacancy });
});

router.post("/create", (req, res) => {
  const isValidated = validator.createValidation(req.body);
  if (isValidated.error) {
    return res
      .status(400)
      .send({ error: isValidated.error.details[0].message });
  }
  const partnerId = req.body.partnerId;
  const partner = users.find(
    user => partnerId === user.id && user.type === "partner"
  );
  const partnerIndex = users.indexOf(partner);
  if (partnerIndex < 0)
    // Bad request if not found
    return res.status(400).send({ error: "partner not found" });
  const {
    description,
    duration,
    monthlyWage,
    location,
    dailyHours,
    startDate,
    endDate,
    state
  } = req.body;
  const vacancy = new Vacancy(
    partner,
    description,
    duration,
    monthlyWage,
    location,
    dailyHours,
    startDate,
    endDate,
    state
  );
  vacancies.push(vacancy);
  return res.json({ data: vacancy });
});

router.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const vacancy = vacancies.find(vacancy => id === vacancy.id);
  const vacancyIndex = vacancies.indexOf(vacancy);
  const isValidated = validator.updateValidation(req.body);
  if (vacancyIndex < 0)
    // Bad request if not found
    return res.status(400).send({ error: "vacancy not found" });
  if (isValidated.error) {
    return res
      .status(400)
      .send({ error: isValidated.error.details[0].message });
  }
  const partner = users.find(
    user => req.body.partnerId === user.id && user.type === "partner"
  );
  const partnerIndex = users.indexOf(partner);
  if (partnerIndex < 0)
    // Bad request if not found
    return res.status(400).send({ error: "partner not found" });
  let acceptedMember;
  if (req.body.acceptedMemberId) {
    acceptedMember = users.find(
      user => req.body.acceptedMemberId === user.id && user.type === "member"
    );
    const memberIndex = users.indexOf(acceptedMember);
    if (memberIndex < 0)
      // Bad request if not found
      return res.status(400).send({ error: "member not found" });
  }
  const { partnerId, acceptedMemberId, ...vacancyData } = req.body;
  vacancies[vacancyIndex] = { partner, vacancyData, acceptedMember };
  return res.sendStatus(200);
});

router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  const vacancy = vacancies.find(vacancy => id === vacancy.id);
  const vacancyIndex = vacancies.indexOf(vacancy);
  if (vacancyIndex < 0)
    // Bad request if not found
    return res.status(400).send({ error: "vacancy not found" });
  vacancies.splice(vacancyIndex, 1);
  return res.sendStatus(200);
});

module.exports = router;
