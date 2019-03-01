const express = require("express");
const users = require("../../userArray");
const User = require("../../models/User");
const validator = require("../../validations/lifeCoachesValidation");
const Feedback = require("../../models/Feedback.js");
const feedbackArray = [
    new Feedback(
      {
        name: "Ahmed",
        dateOfBirth: new Date(12 / 10 / 1998),
        gender: "male",
        joinDate: new Date(),
        email: "hi@yahoo.com",
        skills: ["p", "c"],
        interests: ["hockey", "baseball"],
        reviews: null
      },
      "Really Good",
      new Date()
    ),
    new Feedback(
      {
        name: "Youssef",
        dateOfBirth: new Date(12 / 11 / 1999),
        gender: "male",
        joinDate: new Date(),
        email: "hiks@yahoo.com",
        skills: ["dp", "cd"],
        interests: ["hddockey", "baseball"],
        reviews: null
      },
      "Really Bad",
      new Date()
    )
  ];
  const findFeedBack = idArray => {
    const feedbackResult = idArray.map(id => {
      return feedbackArray.find(feedback => feedback.id === id);
    });
    // to remove undefind elements
    return feedbackResult.filter(feedback => feedback);
  };


const router = express.Router();
router.get("/", (req, res) => {
  const lifeCoaches = users.filter(user => user.type === "lifeCoaches");
  // hiding password
  const lifeCoachesDisplay = lifeCoaches.map(user => {
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
  const { password, ...userData } = req.body;
  const { feedback } = userData;
  if (feedback) {
    userData.Feedback = findFeedBack(feedback);
    // checking that all feedback ids are valid
    if (userData.feedback.length !== feedback.length)
      return res.status(400).send({ error: "invalid feedback" });
  }
  const user = new User("lifeCoaches", userData, password);
  users.push(user);
  return res.json({ data: user });
});
router.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find(user => id === user.id);
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
  const { feedback } = req.body;
  if (feedback) {
    req.body.feedback = findFeedBack(feedback);
    // checking that all feedback ids are valid
    if (req.body.feedback.length !== feedback.length)
      return res.status(400).send({ error: "invalid feedback" });
  }
  users[userIndex].userData = req.body;
  return res.sendStatus(200);
});

module.exports = router;