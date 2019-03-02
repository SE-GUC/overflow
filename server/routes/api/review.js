const express = require("express");
const validator = require("../../validations/reviewValidations");
const router = express.Router();
const User = require("../../models/User");
const Review = require("../../models/Reviews");
const allUsers = require("../../userArray");
//
router.post("/create", (req, res) => {
  const { memberID, partnerID, reviewText, rating } = req.body;
  let userFound = false;
  const isValidated = validator.createValidation(req.body);
  if (isValidated.error)
    return res
      .status(400)
      .json({ error: isValidated.error.details[0].message });
  const partner = allUsers.find(
    user => user.type === "partner" && user.id === partnerID
  );

  if (!partner) return res.status(404).json({ error: "Partner not Found" });
  const newReview = new Review(partner, reviewText, rating, new Date());

  allUsers.map(user => {
    if (user.type === "member" && user.id === memberID) {
      user.userData.reviews.push(newReview);
      userFound = true;
    }
  });
  if (!userFound) {
    return res.status(404).json({ error: "Member not Found" });
  }

  return res.json({ data: newReview });
});

router.get("/readMemberReviews/:memberId", (req, res) => {
  const memberId = req.params.memberId;
  const member = allUsers.find(
    user => user.id === memberId && user.type === "member"
  );
  member
    ? res.json({ data: member.userData.reviews })
    : [res.status(404).json({ err: "Member Not Found" })];
});

router.get("/readReview/:reviewId", (req, res) => {
  const reviewId = req.params.reviewId;
  let fetchedReview = null;
  allUsers.map(user => {
    if (user.type === "member") {
      fetchedReview = user.userData.reviews.find(
        review => review.id === reviewId
      );
      if (fetchedReview) {
        return res.json({ data: fetchedReview });
      }
    }
  });

  return res.status(404).json({ err: "Review Not Found" });
});

// router.get("/read/", (req, res) => {
//   res.json({ data: reviews });
// });

router.put("/update/:memberId/:reviewId", (req, res) => {
  const { memberId, reviewId } = req.params;
  const { partnerID, reviewText, rating } = req.body;
  const isValidated = validator.updateValidation(req.body);
  if (isValidated.error)
    return res
      .status(400)
      .send({ error: isValidated.error.details[0].message });

  const member = allUsers.find(
    user => user.id === memberId && user.type === "member"
  );
  const partner = allUsers.find(
    user => user.id === partnerID && user.type === "partner"
  );
  if (!member) {
    return res.status(404).json({ error: "Member not found" });
  }
  if (!partner) {
    return res.status(404).json({ error: "Partner not found" });
  }
  const review = member.userData.reviews.find(review => review.id === reviewId);
  if (!review) {
    return res.status(404).json({ err: "review Not Found" });
  }
  const datePosted = review.datePosted;
  const reviewIndex = member.userData.reviews.indexOf(review);
  const memberIndex = allUsers.indexOf(member);
  const id = reviewId;
  allUsers[memberIndex].userData.reviews[reviewIndex] = {
    id,
    partner,
    reviewText,
    rating,
    datePosted
  };

  return res.json({
    data: allUsers[memberIndex].userData.reviews[reviewIndex]
  });
});

router.delete("/delete/:memberId/:reviewId", (req, res) => {
  const { memberId, reviewId } = req.params;
  const member = allUsers.find(
    user => user.id === memberId && user.type === "member"
  );
  if (!member) {
    return res.status(404).send({ error: "Member not found" });
  }
  const review = member.userData.reviews.find(review => review.id === reviewId);
  if (!review) {
    return res.status(404).json({ err: "review Not Found" });
  }
  const reviewIndex = member.userData.reviews.indexOf(review);
  const removed = member.userData.reviews.splice(reviewIndex, 1);

  res.sendStatus(200);
});

// router.get("/read/", (req, res) => {
//   res.json({ data: reviews });
// });
module.exports = router;
