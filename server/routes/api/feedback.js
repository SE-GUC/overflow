const express = require("express");
const validator = require("../../validations/feedbackValidations");
const router = express.Router();

const Feedback = require("../../models/Feedback");

const feedbacks = [
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

router.post("/create", (req, res) => {
  const { member, feedbackText, datePosted } = req.body;
  const isValidated = validator.createValidation(req.body);
  if (isValidated.error)
    return res
      .status(400)
      .json({ error: isValidated.error.details[0].message });
  const newFeedback = new Feedback(member, feedbackText, datePosted);
  feedbacks.push(newFeedback);
  res.json({ data: newFeedback });
  res.sendStatus(200);
});

router.get("/read/:id", (req, res) => {
  const id = req.params.id;
  let found = false;
  let currentFeedback = null;
  feedbacks.forEach(feedback => {
    if (feedback.id == id) {
      found = true;
      currentFeedback = feedback;
    }
  });
  found
    ? [res.json({ data: currentFeedback }), res.sendStatus(200)]
    : [res.sendStatus(404), res.json({ err: "Feedback Not Found" })];
});

router.get("/read/", (req, res) => {
  res.json({ data: feedbacks });
});

router.post("/update/:id", (req, res) => {
  const id = req.params.id;
  const isValidated = validator.createValidation(req.body);
  if (isValidated.error)
    return res
      .status(400)
      .send({ error: isValidated.error.details[0].message });
  const newFeedback = req.body;
  let tempFeed;
  let found = false;
  feedbacks.map((feedback, i) => {
    if (feedback.id == id) {
      found = true;

      feedback = {
        id,
        ...newFeedback
      };
      feedbacks.splice(i, 1, feedback);
      tempFeed = feedback;
    }
  });
  found
    ? [res.json({ data: tempFeed }), res.sendStatus(200)]
    : [res.sendStatus(404), res.json({ err: "Feedback Not Found" })];
});

router.post("/delete/:id", (req, res) => {
  const id = req.params.id;
  let found = false;
  feedbacks.map((feedback, i) => {
    if (feedback.id == id) {
      found = true;
      tempFeed = feedbacks.splice(i, 1);
    }
  });
  found
    ? [res.json({ data: tempFeed }), res.sendStatus(200)]
    : [res.sendStatus(404),res.json({ err: "Feedback Not Found" }), ];
});

router.get("/read/", (req, res) => {
  res.json({ data: feedbacks });
  res.sendStatus(200);
});
module.exports = router;
