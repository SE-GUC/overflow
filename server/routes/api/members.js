const express = require("express");
const users = require("../../userArray");
const User = require("../../models/User");
const Member = require("../../models/Member");
const validator = require("../../validations/memberValidation");

const router = express.Router();
router.get("/", (req, res) => {
  const members = users.filter(user => user.type === "member");
  const memberDisplay = members.map(user => {
    const { password, ...userData } = user;
    return userData;
  });
  return res.json({ data: memberDisplay });
});
router.post("/create", (req, res) => {
  const isValidated = validator.createValidation(req.body);
  if (isValidated.error) {
    return res
      .status(400)
      .send({ error: isValidated.error.details[0].message });
  }
  const { password, ...userData } = req.body;
  const { name, dateOfBirth, gender, email, skills, interests } = userData;
  const member = new Member(
    name,
    new Date(dateOfBirth),
    gender,
    new Date(),
    email,
    skills,
    interests,
    []
  );
  const user = new User("member", member, password);
  users.push(user);
  return res.json({ data: user });
});
router.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find(user => id === user.id && user.type === "member");
  const userIndex = users.indexOf(user);
  const isValidated = validator.updateValidation(req.body);
  if (userIndex < 0)
    // Bad request if not found
    return res.status(400).send({ error: "id not found" });
  if (isValidated.error) {
    return res
      .status(400)
      .send({ error: isValidated.error.details[0].message });
  }
  const { dateOfBirth } = req.body;
  const newAge = new Date().getFullYear() - new Date(dateOfBirth).getFullYear();
  req.body.age = newAge;
  req.body.reviews = users[userIndex].userData.reviews;
  users[userIndex].userData = req.body;
  return res.sendStatus(200);
});

module.exports = router;
