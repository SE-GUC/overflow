const express = require("express");
const validator = require("../../validations/reviewValidations");
const router = express.Router();

const Review = require("../../models/Reviews");
const Feedback = require("../../models/Feedback");

const reviews = [
  new Review(
    {
      name: "Ahmed",
      address: "rehab",
      email: "youssef@hotmail.com",
      fax: "01042",
      phone: "23453",
      partners: [],
      members: [
        {
          name: "Youssef",
          dateOfBirth: new Date(12 / 11 / 1999),
          gender: "male",
          joinDate: new Date(),
          email: "hiks@yahoo.com",
          skills: ["dp", "cd"],
          interests: ["hddockey", "baseball"],
          reviews: null
        }
      ],
      fieldOfWork: "RBOTICS",
      projects: ["ds", "sjsn"],
      feedback: new Feedback(
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
    },
    "HEllo",
    "1",
    new Date(),
)
];

router.post("/create", (req, res) => {
  const {partner, reviewText, rating, datePosted } = req.body;
  const isValidated = validator.createValidation(req.body);
  if (isValidated.error)
    return res
      .status(400)
      .json({ error: isValidated.error.details[0].message });
  const newReview = new Review(partner, reviewText, rating, datePosted);
  reviews.push(newReview);
  res.json({ data: newReview });
});

router.get("/read/:id", (req, res) => {
  const id = req.params.id;
  let found = false;
  let currentReview = null;
  reviews.forEach(review => {
    if (review.id == id) {
      found = true;
      currentReview = review;
    }
  });
  found
    ? res.json({ data: currentReview })
    : res.json({ err: "review Not Found" });
});

router.get("/read/", (req, res) => {
  res.json({ data: reviews });
});

router.post("/update/:id", (req, res) => {
  const id = req.params.id;
  const isValidated = validator.createValidation(req.body);
  if (isValidated.error)
    return res
      .status(400)
      .send({ error: isValidated.error.details[0].message });
  const newreview = req.body;
  let tempFeed;
  let found = false;
  reviews.map((review, i) => {
    if (review.id == id) {
      found = true;

      review = {
        id,
        ...newreview
      };
      reviews.splice(i, 1, review);
      tempReview = review;
    }
  });
  found
    ? res.json({ data: tempReview })
    : res.json({ err: "review Not Found" });
});

router.post("/delete/:id", (req, res) => {
  const id = req.params.id;
  let found = false;
  reviews.map((review, i) => {
    if (review.id == id) {
      found = true;
      tempFeed = reviews.splice(i, 1);
    }
  });
  found
    ? res.json({ data: tempFeed })
    : res.json({ err: "review Not Found" });
});

router.get("/read/", (req, res) => {
  res.json({ data: reviews });
});
module.exports = router;
