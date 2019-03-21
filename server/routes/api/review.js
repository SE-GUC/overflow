const express = require("express");
const validator = require("../../validations/reviewValidations");
const router = express.Router();
const User = require("../../models/User");
const Review = require("../../models/Reviews");

//
router.post("/create", async (req, res) => {
  try {
    const { memberID, partnerID, reviewText, rating } = req.body;
    const query1 = { _id: memberID, type: "member" };
    const member = await User.findOne(query1);
    const query2 = { _id: partnerID, type: "partner" };
    const partner = await User.findOne(query2);
    const isValidated = validator.createValidation(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .json({ error: isValidated.error.details[0].message });
    if (!partner) return res.status(404).json({ error: "Partner not Found" });
    if (!member) return res.status(404).json({ error: "Partner not Found" });
    const datePosted = new Date();
    const newReview = {
      partner,
      reviewText,
      rating,
      datePosted
    };
    member.userData.reviews.push(newReview);
    await User.updateOne(query1, member);

    return res.json({ data: newReview });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

router.get("/readMemberReviews/:memberId", async (req, res) => {
  const memberId = req.params.memberId;
  const query = { _id: memberId, type: "member" };
  const member = await User.findOne(query);
  member
    ? res.json({ data: member.userData.reviews })
    : [res.status(404).json({ err: "Member Not Found" })];
});

router.get("/readReview/:reviewId", async (req, res) => {
  const reviewId = req.params.reviewId;
  const allUsers = await User.find();
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

router.put("/update/:memberId/:reviewId", async (req, res) => {
  try {
    const { memberId, reviewId } = req.params;
    const { partnerID, reviewText, rating } = req.body;
    const isValidated = validator.updateValidation(req.body);
    if (isValidated.error)
      return res
        .status(400)
        .send({ error: isValidated.error.details[0].message });
    const query1 = { _id: memberId, type: "member" };
    const member = await User.findOne(query1);
    const query2 = { _id: partnerID, type: "partner" };
    const partner = await User.findOne(query2);
    if (!member) {
      return res.status(404).json({ error: "Member not found" });
    }
    if (!partner) {
      return res.status(404).json({ error: "Partner not found" });
    }
    const review = member.userData.reviews.find(
      review => review.id === reviewId
    );
    if (!review) {
      return res.status(404).json({ err: "review Not Found" });
    }
    const datePosted = review.datePosted;
    const reviewIndex = member.userData.reviews.indexOf(review);
    const id = reviewId;
    member.userData.reviews[reviewIndex] = {
      id,
      partner,
      reviewText,
      rating,
      datePosted
    };
    await User.updateOne(query1, member);
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

router.delete("/delete/:memberId/:reviewId", async (req, res) => {
  try {
    const { memberId, reviewId } = req.params;
    const query1 = { _id: memberId, type: "member" };
    const member = await User.findOne(query1);

    if (!member) {
      return res.status(404).send({ error: "Member not found" });
    }
    const review = member.userData.reviews.find(
      review => review.id === reviewId
    );
    if (!review) {
      return res.status(404).json({ err: "review Not Found" });
    }
    const reviewIndex = member.userData.reviews.indexOf(review);
    member.userData.reviews.splice(reviewIndex, 1);
    await User.updateOne(query1, member);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

// router.get("/read/", (req, res) => {
//   res.json({ data: reviews });
// });
module.exports = router;
