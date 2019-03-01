const express = require("express");
const users = require("../../userArray");
const User = require("../../models/User");
const validator = require("../../validations/lifeCoachesValidation");
const LifeCoach=require("../../models/LifeCoach");

const router = express.Router();
router.get("/", (req, res) => {
  const lifeCoach = users.filter(user => user.type === "lifeCoach");
  // hiding password
  const lifeCoachesDisplay = lifeCoach.map(user => {
    const { password, ...userData } = user;
    return userData;
  });
  return res.json({ data: lifeCoachesDisplay });
});

router.post("/create", (req, res) => {
  const isValidated = validator.createValidation(req.body);
  if (isValidated.error) {
    return res
      .status(400)
      .send({ error: isValidated.error.details[0].message });
  }

  const {password,...userData}=req.body
  const {
    name,
    dateOfBirth,
    gender,
    joinDate,
    hourlyRate,
    email,
  }=userData;
  const lifeCoach = new lifeCoach(
    name,
    new date(dateOfBirth),
    gender,
    joinDate,
    hourlyRate,
    email,
    
  );
  const user = new User("lifeCoach", lifeCoach, password);
  users.push(user);
  return res.json({ data: user });
});
router.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find(user => id === user.id && user.type==="lifeCoach");
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
 
 const {dateOfBirth}=req.body
 const newAge= new Date().getFullYear()-dateOfBirth.getFullYear();
 req.body.age=newAge;
 req.body.monthlySlots = users[userIndex].userData.monthlySlots;
 users[userIndex].userData = req.body;
 return res.sendStatus(200);
});

module.exports = router;