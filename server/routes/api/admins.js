const express = require("express");
const users = require("../../userArray");
const User = require("../../models/User");
const Admin = require("../../models/Admin");
const validator = require("../../validations/adminValidation");

const router = express.Router();
router.get("/", (req, res) => {
  const admins = users.filter(user => user.type === "admin");
  // hiding password
  const adminDisplay = admins.map(user => {
    const { password, ...userData } = user;
    return userData;
  });
  return res.json({ data: adminDisplay });
});

router.post("/create", (req, res) => {
  const isValidated = validator.createValidation(req.body);
  if (isValidated.error) {
    return res
      .status(400)
      .send({ error: isValidated.error.details[0].message });
  }
  const { password, ...userData } = req.body;
  const { name, dateOfBirth, gender, salary, email, isSuper } = userData;
  const joinDate = new Date();
  const admin = new Admin(
    name,
    new Date(dateOfBirth),
    gender,
    joinDate,
    salary,
    email,
    isSuper
  );
  const user = new User("admin", admin, password);
  users.push(user);
  return res.json({ data: user });
});
router.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find(user => id === user.id && user.type === "admin");
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
  req.body.age = new Date().getFullYear() - new Date(dateOfBirth).getFullYear();
  users[userIndex].userData = req.body;
  return res.sendStatus(200);
});

module.exports = router;
